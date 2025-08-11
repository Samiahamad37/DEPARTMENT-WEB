import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import lightArrow from "../assets/light-arrow.gif";

interface AnnouncementItem {
  id: number;
  title: string;
  content: string;
  date_posted: string;
  status?: string;
  image?: string;
}

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date_posted: string;
  image?: string;
  location?: string;
}

interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
  location?: string;
  image?: string;
}

const filterByDateDesc = (
  a: AnnouncementItem | NewsItem | EventItem,
  b: AnnouncementItem | NewsItem | EventItem
) => {
  const aDate = "date_posted" in a ? a.date_posted : a.date;
  const bDate = "date_posted" in b ? b.date_posted : b.date;
  return new Date(bDate).getTime() - new Date(aDate).getTime();
};

const EventDescription = ({ event }: { event: EventItem | NewsItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortLength = 100;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const description = event.description || '';
  const displayText = isExpanded 
    ? description 
    : description.length > shortLength 
      ? description.slice(0, shortLength) + '...' 
      : description;

  return (
    <div className="text-black">
      <p>
        {displayText}
        {description.length > shortLength && (
          <button 
            onClick={toggleReadMore} 
            className="ml-2 text-blue-600 hover:underline focus:outline-none"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>
    </div>
  );
};

const Home = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [translateX, setTranslateX] = useState(0);
  const [eventStatus, setEventStatus] = useState<"All" | "Ongoing" | "Completed" | "Upcoming">("All");
  const [newsStatus, setNewsStatus] = useState<"All" | "Latest" | "Archived">("All");

  useEffect(() => {
    fetch("http://localhost:8001/api/announcements/")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error("Failed to fetch announcements:", err));

    fetch("http://localhost:8001/api/news/")
      .then((res) => res.json())
      .then((data) => {
        const normalizedNews = data.map((item: NewsItem) => {
          const postedDate = new Date(item.date_posted);
          const currentDate = new Date();
          const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
          return {
            ...item,
            status: postedDate >= oneWeekAgo ? "Latest" : "Archived",
          };
        });
        setNews(normalizedNews);
      })
      .catch((err) => console.error("Failed to fetch news:", err));

    fetch("http://localhost:8001/api/events/")
      .then((res) => res.json())
      .then((data) => {
        const normalizedEvents = data.map((event: EventItem) => ({
          ...event,
          status: event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1).toLowerCase() : "Upcoming",
        }));
        setEvents(normalizedEvents);
      })
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  const recentAnnouncements = useMemo(() => {
    return [...announcements].sort(filterByDateDesc).slice(0, 3);
  }, [announcements]);

  const filteredEvents = useMemo(() => {
    let filtered = [...events];
    if (eventStatus !== "All") {
      filtered = filtered.filter((event) =>
        event.status.toLowerCase() === eventStatus.toLowerCase()
      );
    }
    return filtered.sort(filterByDateDesc).slice(0, 3);
  }, [events, eventStatus]);

  const filteredNews = useMemo(() => {
    let filtered = [...news];
    if (newsStatus !== "All") {
      filtered = filtered.filter((item: any) =>
        (item as any).status?.toLowerCase() === newsStatus.toLowerCase()
      );
    }
    return filtered.sort(filterByDateDesc).slice(0, 3);
  }, [news, newsStatus]);

  const slideLeft = () => {
    setTranslateX((prev) => Math.min(prev + 724, 0));
  };

  const slideRight = () => {
    const maxTranslate = -(recentAnnouncements.length - 1) * 724;
    setTranslateX((prev) => Math.max(prev - 724, maxTranslate));
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-br from-blue-900 to-orange-700 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your Future starts here</h1>
        <p className="text-lg md:text-2xl mb-8 font-light">
          Computer Systems & Mathematics, Ardhi University
        </p>
        <Link
          to="http://localhost:5174"
          className="mt-6 inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Visit our AI & NextGen Innovative Lab
        </Link>
      </section>

      {/* Announcements */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Announcements</h2>
        <div className="relative flex flex-col items-center overflow-hidden">
          <div className="flex items-center justify-center w-full max-w-full overflow-x-auto">
            <button
              onClick={slideLeft}
              className="bg-gray-200 text-blue-900 px-2 py-1 rounded hover:bg-gray-300 z-10"
              disabled={translateX === 0}
            >
              &lt;
            </button>
            <div className="flex justify-center w-full md:w-[724px]">
              {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map((item, idx) =>
                  idx === -translateX / 724 ? (
                    <div
                      key={item.id}
                      className="relative w-full md:w-[724px] mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden p-6 flex flex-col items-start border border-gray-200"
                    >
                      {idx === 0 && (
                        <img src={lightArrow} alt="New" className="w-8 h-8 " />
                      )}
                      <span className="mb-2">
                        <Link
                          to={`/announcement/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-lg text-blue-900 font-semibold hover:underline"
                        >
                          {item.title}
                        </Link>
                      </span>
                      <div className="text-gray-700 text-base mb-4">
                        {item.content}
                      </div>
                      <div className="text-sm text-gray-500 mt-auto">
                        <time dateTime={item.date_posted}>
                          {new Date(item.date_posted).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  ) : null
                )
              ) : (
                <p className="text-gray-600">No announcements to show.</p>
              )}
            </div>
            <button
              onClick={slideRight}
              className="bg-gray-200 text-blue-900 px-2 py-1 rounded hover:bg-gray-300 z-10"
              disabled={-translateX === (recentAnnouncements.length - 1) * 724}
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-8 bg-pale-blue border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Events</h2>
          <div className="flex gap-2 flex-wrap mb-6">
            {(["All", "Ongoing", "Completed", "Upcoming"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setEventStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  eventStatus === status
                    ? "bg-blue-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute top-2 left-2 bg-blue-800 text-white text-xs px-3 py-1 rounded-full z-10">
                    {event.status}
                  </div>
                  <div className="p-5">
                    <h3 className="text-blue-900 font-bold text-lg">{event.title}</h3>
                    <EventDescription event={event} />
                    {event.location && (
                      <div className="flex items-center text-sm text-gray-600 mt-4 space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600 mt-2 space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No events to show.</p>
            )}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-8 bg-pale-blue border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Latest News</h2>
          <div className="flex gap-2 flex-wrap mb-6">
            {(["All", "Latest", "Archived"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setNewsStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  newsStatus === status
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="text-blue-900 font-bold text-lg">{item.title}</h3>
                    <EventDescription event={item} />
                    <div className="flex items-center text-sm text-gray-600 mt-2 space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.date_posted).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No news articles to show.</p>
            )}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="w-full bg-white py-20 px-6 md:px-10 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Want to know us more?</h2>
          <p className="text-gray-600 text-lg">
            Explore who we are, what drives us, and how we are making a
            difference in our field.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            About Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
