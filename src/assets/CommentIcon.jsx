const CommentIcon = ({color, fill}) => {
  const commentIconStyles = { 
    fill: `${fill}`, 
    stroke: `${color}`, 
  };

  return (
    <div>
      <svg
        aria-label="Comment"
        style={commentIconStyles} 
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Comment</title>
        <path
          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
          fill="none"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    </div>
  );
};

export default CommentIcon;