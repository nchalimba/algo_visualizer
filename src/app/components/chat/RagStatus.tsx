"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";

import clsx from "clsx";
import { getHealthStatus } from "@/api/health";
import { HealthResponse } from "@/app/types";
import { AiOutlineLoading } from "react-icons/ai";

const StatusIndicator = ({
  status,
  label,
}: {
  status: boolean;
  label: string;
}) => (
  <div className="flex items-center gap-2">
    <div
      className={clsx(
        "h-2 w-2 rounded-full",
        status ? "bg-green-500" : "bg-red-500",
        "animate-pulse"
      )}
    />
    <span className="text-xs ">{label}</span>
  </div>
);

const RagStatus = () => {
  const { data, error, isLoading } = useQuery<HealthResponse>({
    queryKey: ["health"],
    queryFn: getHealthStatus,
    refetchInterval: 30 * 1000, //TODO: refetch every 10 seconds if not up. If up, refetch every 5 minutes
  });

  return (
    <div className="p-2 bg-retroDark-300 rounded-lg border border-retroDark-200">
      {error && (
        <div className="flex items-center gap-2 text-red-700">
          <div className="h-2 w-2 rounded-full bg-alert" />
          <span className="text-xs">Service Error</span>
        </div>
      )}
      {isLoading && (
        <div className="flex items-center gap-2">
          <AiOutlineLoading className="h-4 w-4 animate-spin" />
          <span className="text-xs">Checking status...</span>
        </div>
      )}
      {data && !error && (
        <div className="flex gap-2">
          <StatusIndicator
            status={data?.vector_store === "up"}
            label="Vector DB"
          />
          <StatusIndicator status={data?.db === "up"} label="Database" />
        </div>
      )}
    </div>
  );
};

export default RagStatus;
