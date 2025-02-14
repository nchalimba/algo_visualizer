import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { SelectOption } from "@/app/types";
import React from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type Key = string | number;

type Props<T extends Key> = {
  value: SelectOption<T> | null;
  options: SelectOption<T>[];
  onChange: (value: SelectOption<T>) => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
};

const Select = <T extends Key>({
  value,
  options,
  onChange,
  placeholder,
  disabled,
  className = "",
}: Props<T>) => {
  return (
    <div className={twMerge("w-48 lg:w-64", className)}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <ListboxButton className="relative w-full rounded bg-retroDark-350 py-2 px-3 text-left flex items-center justify-between">
          {value?.label || placeholder}
          <FaChevronDown
            className="group pointer-events-none top-3 right-2.5 size-2.5 fill-white/50"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded mt-1 border border-white/5 bg-retroDark-300 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <FaCheck className="invisible size-2.5 fill-white/50 group-data-[selected]:visible" />
              <p>{option.label}</p>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default Select;
