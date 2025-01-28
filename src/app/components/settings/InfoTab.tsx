import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getInfo } from "@/api/info";
import LoadingIndicator from "../common/LoadingIndicator";
import ErrorMessage from "../chat/ErrorMessage";

const InfoTab = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["info"],
    queryFn: getInfo,
  });

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message="Error: could not fetch info" />;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td className=" p-2 whitespace-nowrap">
                  {key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :
                </td>
                <td className=" p-2">
                  {Array.isArray(value) ? (
                    <div className="flex flex-wrap gap-2">
                      {value.map((item, index) => (
                        <React.Fragment key={index}>
                          <div className="flex flex-wrap gap-2">
                            <pre className="bg-retroDark-300 p-1 rounded inline-block w-fit break-words">
                              <code className="break-words whitespace-normal">
                                {item}
                              </code>
                            </pre>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <code className="bg-retroDark-300 p-1 rounded">
                      {value}
                    </code>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoTab;
