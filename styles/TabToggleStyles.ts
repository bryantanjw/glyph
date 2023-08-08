export const tabStyle = {
  transform: "translateZ(0)",
  overflow: "hidden",
  py: 3,
  px: 4,
  rounded: "12px",
  transition: "all 0.3s ease",
  _before: {
    content: "''",
    position: "absolute",
    zIndex: -1,
    mt: "75px",
    width: "100%",
    height: "100%",
  },
  _hover: {
    color: "gray.700",
    _before: {
      background:
        "radial-gradient(circle at center bottom, hsl(0.00, 0%, 100%) -300%, transparent 68%)",
    },
  },
  _selected: {
    color: "gray.900",
    _before: {
      background:
        "radial-gradient(circle at center bottom, hsl(0.00, 0%, 100%) -80%, transparent 71%)",
    },
  },
  _after: {
    content: "''",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    bgClip: "content-box",
  },
};
