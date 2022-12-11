import { useEffect, useState } from "react";

const url = {
  tokyo: "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json",
  osaka: "https://www.jma.go.jp/bosai/forecast/data/forecast/270000.json",
  sapporo: "https://www.jma.go.jp/bosai/forecast/data/forecast/016000.json",
};

type citeis = "tokyo" | "osaka" | "sapporo";

type weather = {
  area: { code: string; name: string };
  waves: string[];
  weatherCodes: string[];
  weathers: string[];
  winds: string[];
};

const List = ({ val }: { val: string[] }) => {
  return (
    <span>
      {val.map((item) => (
        <dd>{item}</dd>
      ))}
    </span>
  );
};

function App() {
  const [weather, setWeather] = useState<weather[]>();
  const handleChange = (city: citeis) => {
    const data = fetch(url[city])
      .then((response) => response.json())
      .then((we) => {
        console.log(we[0].timeSeries[0].areas as weather[]);
        setWeather(we[0].timeSeries[0].areas as weather[]);
      });
    console.log(city);
  };
  useEffect(() => {
    handleChange("tokyo");
  }, []);
  return (
    <>
      <div className="App">
        <h1>演習3</h1>
        <select onChange={(e) => handleChange(e.target.value as citeis)}>
          <option value="tokyo">東京</option>
          <option value="osaka">大阪</option>
          <option value="sapporo">札幌</option>
        </select>
        <h2>today's weather</h2>
        <br />
        <hr />
        <br />
        <dl>
          {weather &&
            weather.map((data, index) => (
              <>
                <dt key={index}>{data.area.name}</dt>
                <dd key={index}>{data.area.code}</dd>
                <dt>波の高さ</dt>
                <List val={data.weatherCodes} />
                <dt>お天気番号</dt>
                <List val={data.weatherCodes} />
                <dt>お天気</dt>
                <List val={data.weathers} />
                <dt>風向</dt>
                <List val={data.winds} />
                <br />
                <hr />
                <br />
              </>
            ))}
        </dl>
      </div>
    </>
  );
}

export default App;
function then(arg0: (weather: any) => void) {
  throw new Error("Function not implemented.");
}
