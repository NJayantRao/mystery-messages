import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { anonymousMessages } from "@/data/home-page-messages";
import { Card, CardContent } from "./ui/card";
import { CarouselApi } from "@/components/ui/carousel";

interface CarouselComponentProps {
  api: CarouselApi | undefined;
  setApi: React.Dispatch<React.SetStateAction<CarouselApi | undefined>>;
}

const CarouselComponent = ({ api, setApi }: CarouselComponentProps) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ background: "#FDF2F8", color: "#DB2777" }}
        >
          Live inbox preview
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Real anonymous messages
        </h2>
        <p className="mt-3 text-gray-500 max-w-sm mx-auto text-[15px]">
          {`These are the kinds of messages landing in people's inboxes right now.`}
        </p>
      </div>

      <Carousel
        setApi={(a) => setApi(a)}
        className="w-full"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="-ml-4">
          {anonymousMessages.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card
                className="h-full rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                style={{ backgroundColor: item.bg }}
              >
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  <div className="text-2xl">{item.emoji}</div>
                  <p
                    className="text-[15px] leading-relaxed flex-1 font-medium"
                    style={{ color: item.accent }}
                  >
                    &ldquo;{item.message}&rdquo;
                  </p>
                  <div
                    className="flex items-center gap-2 pt-3 border-t"
                    style={{ borderColor: item.accent + "22" }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: item.accent }}
                    >
                      ?
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold"
                        style={{ color: item.accent }}
                      >
                        Anonymous
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-3 mt-8">
          <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 border-gray-200 hover:bg-gray-50" />
          <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 border-gray-200 hover:bg-gray-50" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
