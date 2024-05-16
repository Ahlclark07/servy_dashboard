import type { FC } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export const Pagination: FC = function (props) {
  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Montrer&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {props.skip + 1} - {props.size + props.skip}
          </span>
          &nbsp;de&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {props.total}
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => props.setSkip(props.skip - 10)}
          className={
            "inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" +
            (props.skip == 0 ? " cursor-not-allowed" : "")
          }
        >
          <HiChevronLeft className="mr-1 text-base" />
          Précédent
        </button>
        <button
          onClick={() => props.setSkip(props.skip + 10)}
          className={
            "inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" +
            (props.size + props.skip >= props.total
              ? " cursor-not-allowed"
              : "")
          }
        >
          Suivant
          <HiChevronRight className="ml-1 text-base" />
        </button>
      </div>
    </div>
  );
};
