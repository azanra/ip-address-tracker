const InfoContainer = ({ label, data }) => {
  return (
    <div className="w-[260px] h-[100px]">
      <h3 className="text-(--Gray-400) font-bold text-sm mb-4">{label}</h3>
      <h1 className="text-(--Gray-950) font-bold text-2xl">{data}</h1>
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
    <div className="grid rounded-md grid-cols-4 divide-x-1 absolute left-90 top-65 bg-white z-500 shadow-xl py-8 px-8 gap-8">
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
