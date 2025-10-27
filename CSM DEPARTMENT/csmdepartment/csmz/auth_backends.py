from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from django.urls import reverse
from django.shortcuts import redirect


class BearerTokenAuthentication(TokenAuthentication):
    """
    Custom DRF authentication class that supports both 'Token' and 'Bearer' formats
    """
    keyword = 'Bearer'
    
    def authenticate(self, request):
        # Get the authorization header
        auth_header = self.get_authorization_header(request)
        
        if not auth_header:
            return None
            
        # Split the header
        auth = auth_header.split()
        
        if not auth:
            return None
            
        # Check if it's Bearer format
        if auth[0].lower() == self.keyword.lower().encode():
            if len(auth) == 1:
                msg = 'Invalid token header. No credentials provided.'
                raise AuthenticationFailed(msg)
            elif len(auth) > 2:
                msg = 'Invalid token header. Token string should not contain spaces.'
                raise AuthenticationFailed(msg)

            try:
                token = auth[1].decode()
            except UnicodeError:
                msg = 'Invalid token header. Token string should not contain invalid characters.'
                raise AuthenticationFailed(msg)

            return self.authenticate_credentials(token)
        
        # If not Bearer format, try Token format (fallback to parent class)
        return super().authenticate(request)


class TokenAuthenticationBackend(ModelBackend):
    """
    Custom authentication backend that supports bearer token authentication
    for Django admin interface
    """
    
    def authenticate(self, request, token=None, **kwargs):
        if not token:
            return None
            
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            token_obj = Token.objects.select_related('user').get(key=token)
            user = token_obj.user
            
            # Check if user is staff and has admin profile
            if (user.is_active and 
                user.is_staff and 
                hasattr(user, 'admin_profile') and 
                user.admin_profile.is_active):
                return user
                
        except Token.DoesNotExist:
            pass
            
        return None


class AdminTokenMiddleware(MiddlewareMixin):
    """
    Middleware to handle bearer token authentication for admin pages
    """
    
    def process_request(self, request):
        # Check for Authorization header with Bearer token
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if auth_header.startswith('Bearer '):
            # Convert Bearer token to Token format for DRF compatibility
            token = auth_header[7:]  # Remove 'Bearer ' prefix
            request.META['HTTP_AUTHORIZATION'] = f'Token {token}'
            
            # For admin URLs, also authenticate using our custom backend
            if request.path.startswith('/admin/'):
                # Skip if user is already authenticated via session
                if request.user.is_authenticated:
                    return None
                    
                # Authenticate using token
                backend = TokenAuthenticationBackend()
                user = backend.authenticate(request, token=token)
                
                if user:
                    request.user = user
                    request._cached_user = user
                    return None
                else:
                    # Return 401 for API requests, redirect for browser requests
                    if request.META.get('HTTP_ACCEPT', '').startswith('application/json'):
                        return JsonResponse({'error': 'Invalid or expired token'}, status=401)
                    else:
                        # For browser requests, redirect to login
                        return redirect(f"{reverse('admin:login')}?next={request.path}")
        
        return None
