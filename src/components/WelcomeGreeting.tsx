"use client";

import Link from "next/link";
import { useAccount } from "@/context/AccountContext";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function WelcomeGreeting() {
  const { profile } = useAccount();
  const name = profile.firstName.trim();

  return (
    <p className="font-display text-base sm:text-xl text-charcoal mb-6">
      {name ? (
        <>
          Happy {DAYS[new Date().getDay()]}, {name}!
        </>
      ) : (
        <>
          Hello!{" "}
          <Link href="/account" className="text-terracotta hover:underline">
            Add your name
          </Link>{" "}
          for a personalized greeting.
        </>
      )}
    </p>
  );
}
