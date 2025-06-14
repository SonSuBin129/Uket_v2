"use client";

import {
  Activity,
  ActivityContent,
  ActivityFooter,
  ActivityHeader,
} from "@ui/components/ui/activity";

import { Button } from "@ui/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { depositType } from "@uket/api/types/ticket";
import { handleClipboard } from "../../../../../utils/clipboard";

interface StepCompleteProps {
  deposit: depositType;
  routeUrl: string;
}

export default function StepComplete({ routeUrl }: StepCompleteProps) {
  const router = useRouter();

  return (
    <Activity>
      <ActivityContent>
        <ActivityHeader className="relative grow items-center justify-center overflow-hidden">
          <Image
            src="/complete-3d-ticket.png"
            alt="티켓 이미지"
            width={180}
            height={180}
            className="animate-rotate-axis w-[180px] h-auto"
          />
          <div className="z-20 mt-10 flex flex-col justify-start gap-5 text-center">
            <h1 className="text-[23px] font-black">
              <p>예매 정보가 등록되었습니다.</p>
              <p>입금 후 예매가 확정됩니다.</p>
            </h1>
            <h6 className="text-desc text-base font-medium">
              티켓가 {"15,000"}원
            </h6>
            <div className="flex items-center justify-center gap-2">
              <div className="text-base font-normal text-[#8989A1]">
                <span>{"국민 123456-78-9101112"} </span>
                <span>{"UKET"}</span>
              </div>
              <p
                className="text-brand decoration-brand cursor-pointer font-bold underline decoration-solid decoration-1 underline-offset-2"
                onClick={() => handleClipboard("국민 123456-78-9101112 UKET")}
              >
                복사
              </p>
            </div>
          </div>
          <Image
            src="/ticketing-complete.png"
            alt="티켓팅 완료 이미지"
            width={200}
            height={200}
            className="animate-ping-dealy absolute h-full w-full"
          />
        </ActivityHeader>
        <ActivityFooter>
          <div className="mb-5 flex w-full flex-row justify-center gap-3 px-4 sm:flex-row">
            <Button
              className="border-brand text-brand grow basis-1/2 border bg-white hover:bg-slate-100"
              onClick={() => router.replace(routeUrl)}
            >
              나중에 하기
            </Button>
            <Button
              asChild
              className="bg-brand border-brand hover:bg-brandHover grow basis-1/2 border"
            >
              <Link
                href={routeUrl ?? ""}
                target="_blank"
                className="text-white"
              >
                카카오로 입금하기
              </Link>
            </Button>
          </div>
        </ActivityFooter>
      </ActivityContent>
    </Activity>
  );
}
