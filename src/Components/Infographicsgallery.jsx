import React, { useEffect, useMemo, useRef, useState } from "react";
import infographicsData from "./infographicsData.json";
import "./infographicsgallery.css";

/* ---------------------------------------------------------
   Small inline icon set
--------------------------------------------------------- */
function Icon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );

    case "search":
      return (
        <svg {...common} width="18" height="18">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );

    default:
      return null;
  }
}

const ITEMS_PER_PAGE = 4;
const ALL_TOPICS_LABEL = "All Topics";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "az", label: "Title: A to Z" },
];

export default function InfographicsGallery() {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState(ALL_TOPICS_LABEL);
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState(null);

  const closeButtonRef = useRef(null);
  const lastFocusedElement = useRef(null);

  /* ---------------------------------------------------------
     Topics
  --------------------------------------------------------- */
  const topics = useMemo(() => {
    const unique = Array.from(
      new Set(infographicsData.map((item) => item.topic))
    );

    return [ALL_TOPICS_LABEL, ...unique];
  }, []);

  /* ---------------------------------------------------------
     Filter + Search + Sort
  --------------------------------------------------------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let items = infographicsData.filter((item) => {
      const matchesTopic =
        activeTopic === ALL_TOPICS_LABEL || item.topic === activeTopic;

      const matchesQuery =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.caption.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q);

      return matchesTopic && matchesQuery;
    });

    items = [...items].sort((a, b) => {
      if (sortBy === "az") {
        return a.title.localeCompare(b.title);
      }

      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });

    return items;
  }, [query, activeTopic, sortBy]);

  /* ---------------------------------------------------------
     Pagination
  --------------------------------------------------------- */
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    setPage(1);
  }, [query, activeTopic, sortBy]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;

    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  /* ---------------------------------------------------------
     Modal
  --------------------------------------------------------- */
  const openModal = (item, triggerEl) => {
    lastFocusedElement.current = triggerEl || document.activeElement;
    setActiveItem(item);
  };

  const closeModal = () => {
    setActiveItem(null);

    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  };

  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    closeButtonRef.current?.focus();

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  /* ---------------------------------------------------------
     Stats
  --------------------------------------------------------- */
  const totalResources = infographicsData.length;

  const totalTopics = topics.length - 1;

  const blueGuides = infographicsData.filter(
    (item) => item.thumbnailColor === "blue"
  ).length;

  const greenGuides = infographicsData.filter(
    (item) => item.thumbnailColor === "green"
  ).length;

  return (
    <section className="ig-section" aria-labelledby="ig-heading" id="gallery">
      {/* HEADER */}
      <header className="ig-header">
        <h2 className="ig-title" id="ig-heading">
          Infographics &amp; Gallery
        </h2>

        <p className="ig-subtitle">
          Visual guides to help you learn and remember.
        </p>
      </header>

      {/* CONTROLS */}
      <div className="ig-controls">
        {/* SEARCH */}
        <div className="ig-search-wrap">
          <span className="ig-search-icon" aria-hidden="true">
            <Icon name="search" />
          </span>

          <input
            type="search"
            className="ig-search-input"
            placeholder="Search resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search infographics"
          />
        </div>

        {/* FILTERS */}
        <div className="ig-filter-row">
          <div
            className="ig-chip-scroll"
            role="group"
            aria-label="Filter by topic"
          >
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                className={`ig-chip${
                  activeTopic === topic ? " is-active" : ""
                }`}
                aria-pressed={activeTopic === topic}
                onClick={() => setActiveTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>

          <select
            className="ig-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort infographics"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FOUR SUMMARY BOXES */}
     

      {/* RESULT COUNT */}
      <p className="ig-result-count">
        {filtered.length}{" "}
        {filtered.length === 1 ? "resource" : "resources"} found
      </p>

      {/* GALLERY */}
      <div className="ig-grid">
        {pageItems.length === 0 && (
          <div className="ig-empty">
            <p className="ig-empty-title">No results found</p>

            <p>
              Try a different search term or choose another topic.
            </p>
          </div>
        )}

        {pageItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className="ig-card"
            onClick={(e) => openModal(item, e.currentTarget)}
            aria-haspopup="dialog"
          >
            <div className={`ig-thumb theme-${item.thumbnailColor}`}>
              <span className="ig-thumb-tag">{item.topic}</span>

              <img
                src={item.icon}
                alt={item.altText}
                className="ig-thumb-image"
              />
            </div>

            <div className="ig-card-body">
              <h3 className="ig-card-title">{item.title}</h3>

              <p className="ig-card-caption">{item.caption}</p>

              <span className="ig-card-footer">
                View details →
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <nav
          className="ig-pagination"
          aria-label="Gallery pagination"
        >
          <button
            type="button"
            className="ig-page-btn"
            onClick={() =>
              setPage((currentPage) => Math.max(1, currentPage - 1))
            }
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((num) => (
            <button
              key={num}
              type="button"
              className={`ig-page-btn${
                page === num ? " is-active" : ""
              }`}
              aria-current={page === num ? "page" : undefined}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            className="ig-page-btn"
            onClick={() =>
              setPage((currentPage) =>
                Math.min(totalPages, currentPage + 1)
              )
            }
            disabled={page === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </nav>
      )}

      {/* MODAL */}
      {activeItem && (
        <div
          className="ig-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="ig-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ig-modal-title"
          >
            {/* MODAL IMAGE */}
            <div
              className={`ig-modal-banner theme-${activeItem.thumbnailColor}`}
            >
              <img
                src={activeItem.icon}
                alt={activeItem.altText}
                className="ig-modal-image"
              />

              <button
                type="button"
                className="ig-modal-close"
                onClick={closeModal}
                ref={closeButtonRef}
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="ig-modal-body">
              <span className="ig-modal-tag">
                {activeItem.topic}
              </span>

              <h3
                className="ig-modal-title"
                id="ig-modal-title"
              >
                {activeItem.title}
              </h3>

              <p className="ig-modal-desc">
                {activeItem.description}
              </p>

              <p className="ig-modal-subhead">
                Key takeaways
              </p>

              <ul className="ig-modal-list">
                {activeItem.keyTakeaways.map((point, index) => (
                  <li key={index}>
                    <Icon name="check" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p className="ig-modal-alt">
                <strong>Image description: </strong>
                {activeItem.altText}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}