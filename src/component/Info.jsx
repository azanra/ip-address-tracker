const InfoContainer = ({ label, data }) => {
  return (
    <div>
      <h3>{label}</h3>
      <h1>{data}</h1>
    </div>
  );
};

const Info = ({ data }) => {
  const { ip, location, isp } = data;
  const { country, region, city, postalCode, timezone } = location;
  const renderData = [
    {
      text: "IP ADDRESS",
      data: ip,
    },
    {
      text: "LOCATION",
      data: `${country} ${region}, ${city} ${postalCode}`,
    },
    {
      text: "TIMEZONE",
      data: timezone,
    },
    {
      text: "ISP",
      data: isp,
    },
  ];
  return (
    <div>
      <InfoContainer label="IP ADDRESS" data={ip} />
      {renderData.map((renderedData, index) => {
        return (
          <InfoContainer
            key={index}
            label={renderedData.text}
            data={renderedData.data}
          />
        );
      })}
    </div>
  );
};

export default Info;
