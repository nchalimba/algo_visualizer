import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getInfo } from "@/api/info";
import LoadingIndicator from "../common/LoadingIndicator";
import Link from "next/link";
import Alert from "../common/Alert";

const isUrl = (str: string) => {
  const urlRegex = /^(https?:\/\/[^\s]+)/g;
  return urlRegex.test(str);
};

const InfoTab = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["info"],
    queryFn: getInfo,
  });

  if (isLoading) return <LoadingIndicator />;
  if (error)
    return <Alert type="error" message="Error: could not fetch info" />;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <div className="md:hidden">
        <div className="flex flex-col space-y-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="bg-retroDark-200 rounded-lg p-4">
              <h2 className="text-lg font-medium">
                {key
                  .replace(/_/g, " ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                :
              </h2>
              <div className="text-lg break-all">
                {Array.isArray(value) ? (
                  <div className="flex flex-wrap gap-2 overflow-x-auto">
                    {value.map((item, index) => (
                      <React.Fragment key={index}>
                        <pre className="bg-retroDark-400 p-1 rounded inline-block w-fit break-words">
                          <code className="break-words whitespace-normal text-sm">
                            {isUrl(item) ? (
                              <Link
                                href={item}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-retroText-accent transition-colors"
                              >
                                {item}
                              </Link>
                            ) : (
                              item
                            )}
                          </code>
                        </pre>
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <code className="bg-retroDark-400 p-1 rounded text-sm">
                    {value}
                  </code>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-500">
            <tbody className="divide-y divide-gray-500">
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {key
                      .replace(/_/g, " ")
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                    :
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm overflow-x-auto">
                    {Array.isArray(value) ? (
                      <div className="flex flex-wrap gap-2">
                        {value.map((item, index) => (
                          <React.Fragment key={index}>
                            <pre className="bg-retroDark-400 p-1 rounded inline-block w-fit break-words">
                              <code className="break-words whitespace-normal">
                                {isUrl(item) ? (
                                  <Link
                                    href={item}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-retroText-accent transition-colors"
                                  >
                                    {item}
                                  </Link>
                                ) : (
                                  item
                                )}
                              </code>
                            </pre>
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <code className="bg-retroDark-400 p-1 rounded">
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
    </div>
  );
};

export default InfoTab;
