import Option from "./option";

export default function Section({
  id,
  name,
  missions,
}: {
  id: number;
  name: string;
  missions: {
    id: number;
    name: string;
    type: string;
    max_score: number;
    options?: any[];
  }[];
}) {
  return (
    <div
      id={name}
      className="flex flex-col px-4 py-2 gap-2 transition-all duration-200 ease-in"
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      {missions &&
        missions.map((mis, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_25%] items-center bg-white border border-gray-300 rounded-md p-3"
          >
            <p>{mis.name}</p>
            <Option
              sectionId={id}
              missionId={mis.id}
              type={mis.type}
              mscore={mis.max_score}
              options={mis.options}
            />
          </div>
        ))}
    </div>
  );
}
