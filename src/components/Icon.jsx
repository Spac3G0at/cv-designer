const Icon = ({ icon }) => {
  return (
    <span
      style={{
        fontFamily: "FontAwesome",
        fontSize: "15px",
        marginRight: "10px",
      }}
    >
      {icon}
    </span>
  );
};

export default Icon;
