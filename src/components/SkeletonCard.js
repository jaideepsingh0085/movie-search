import React from "react";
import "../styles/SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img skeleton-shimmer" />
      <div className="skeleton-line skeleton-shimmer" style={{ width: "80%" }} />
      <div className="skeleton-line skeleton-shimmer" style={{ width: "40%" }} />
    </div>
  );
};

export default SkeletonCard;