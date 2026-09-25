import { useEffect, useState } from "react";

const TOTAL_KEY = "bb_visitor_total";
const SESSION_KEY = "bb_visitor_session_counted";

/**
 * A real count of visits from THIS browser, persisted in localStorage.
 *
 * Honest caveat: without a backend/database, there's no way to count
 * visits across different people's browsers — localStorage is local
 * to one browser on one device. This increments once per new tab
 * session (using sessionStorage as the "have I already counted this
 * visit" flag) and keeps the running total in localStorage, so it
 * behaves like a real counter for repeat visits on the same device.
 * Wire it to a backend endpoint later if you want a true site-wide count.
 */
export function useVisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let total = Number(window.localStorage.getItem(TOTAL_KEY)) || 0;
    const alreadyCountedThisSession = window.sessionStorage.getItem(SESSION_KEY);

    if (!alreadyCountedThisSession) {
      total += 1;
      window.localStorage.setItem(TOTAL_KEY, String(total));
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }

    setCount(total);
  }, []);

  return count;
}