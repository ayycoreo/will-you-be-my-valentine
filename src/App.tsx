"use client";
import { useState, useRef, useEffect } from "react";
import "./AppCSS.css";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [noVisible, setNoVisible] = useState(true);
  // cap yes button text size so it doesn't overflow small screens
  const rawYesSize = noCount * 20 + 16;
  const yesButtonSize = Math.min(rawYesSize, 72);
  const NO_PHRASES = [
    "No",
    "Are you sure?",
    "What if I asked really nicely?",
    "Pretty please",
    "With a mcdonalds frappe and flowers?",
    "What about a new coach bag? ;)",
    "PLEASE BABY",
    "But why not.... :(",
    "so you want to betray me...",
    "why are you like this",
    "girl please.",
    "stop pressing no..",
    "bro cmon",
    "stop trolling",
    "POR FAVOR",
    "gg",
  ];

  const handleNoClick = () => {
    setNoCount((prev) => {
      const next = prev + 1;
      if (next >= NO_PHRASES.length - 1) {
        setExploded(true);
      }
      return next;
    });
    setNoAnimating(true);
  };

  const [noAnimating, setNoAnimating] = useState(false);

  const handleYesClick = () => {
    setYesPressed(true);
  };

  const getNoButtonText = () => {
    return NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
  };

  return (
    <div className="valentine-page">
      {yesPressed ? (
        <>
          <img
            className="hero-img"
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="happy bear kiss"
          />
          <div className="title">YAY! NOW OPEN THE DOOR I AM FREEZING! 🧊</div>
          <div className="subtitle"> Spotify API is down so I can't autoplay... 🥹</div>

        <iframe 
          data-testid="embed-iframe" 
          style= {{borderRadius: "12px"}} 
          src="https://open.spotify.com/embed/track/1bv9wrUiUgjWfahxVwtGSr?utm_source=generator&theme=0" 
          width="50%" height="352" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="eager">

        </iframe>
        </>
      ) : (
        <>
          <img
            className="hero-img"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            alt="cute bear with roses"
          />
          <h1 className="title">Hi Aniyah... will you be my valentine ❤️?</h1>
          <h2 className="subtitle">i dare you to say no...just watch what happens😡</h2>
          <div className="btn-row">
            <button
              className={`btn btn-yes ${exploded ? "fat-yes" : ""}`}
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            {noVisible && (
              <button
                onClick={handleNoClick}
                className={`btn btn-no ${noAnimating ? "wiggle" : ""} ${exploded ? "explode" : ""}`}
                onAnimationEnd={(e) => {
                  setNoAnimating(false);
                  if (exploded && (e as any).animationName === "explode") {
                    setNoVisible(false);
                  }
                }}
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            )}
          </div>
          {exploded && (
            <div className="exploded-message">You never had a choice — click the FAT Yes Button :)</div>
          )}
        </>
      )}
    </div>
  );
}
