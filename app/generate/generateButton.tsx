import { motion } from "framer-motion";
import { Image, Button } from "@chakra-ui/react";

export default function GenerateButton({
  isSuccess,
  isSubmitting,
  handleSubmit,
  status,
  isDisabled = true,
}) {
  return (
    <div className="flex justify-end">
      {isSuccess ? (
        <button
          className="cursor-disabled group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold group inline-flex items-center justify-center text-sm text-white duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
          style={{
            boxShadow:
              "0px 1px 4px rgba(27, 71, 13, 0.17), inset 0px 0px 0px 1px #5fc767, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        </button>
      ) : (
        <div className="flex flex-row gap-2">
          <Button
            variant={"unstyled"}
            className="group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex  active:scale-95 scale-100 duration-75  disabled:cursor-not-allowed"
            type="submit"
            isDisabled={isDisabled || isSubmitting}
            onClick={handleSubmit}
            boxShadow={
              "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)"
            }
            _hover={{
              variant: "unstyled",
            }}
          >
            <span>
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-slate-50 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth={3}
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{status}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-x-2">
                  <span>Generate</span>
                  <Image
                    filter={"invert(1)"}
                    boxSize={"18px"}
                    src={"/sparkling-icon.png"}
                    alt={"Generate"}
                  />
                </div>
              )}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
