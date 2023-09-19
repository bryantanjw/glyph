"use client";

import React from "react";

import { Column } from "@/components/ui/column";
import { Row } from "@/components/ui/row";
import { P } from "@/components/ui/typography";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { Preset, presets } from "@/data/presets";

type SeeExampleOutputDialogProps = {
  item: any;
  setOpen: (state: boolean) => void;
};

type ItemProps = {
  item: Preset | null;
  onSelectExample: (item: Preset | null) => void;
};

function Item({ item, onSelectExample }: ItemProps) {
  return (
    <div
      onClick={() => {
        onSelectExample(item);
      }}
      className="group min-w-[256px] w-[256px] border flex items-center justify-center border-primary/20 rounded p-4 cursor-pointer hover:border-muted-foreground hover:shadow-md transition-colors"
    >
      <p className="group-hover:text-slate-800 text-sm text-primary/70 line-clamp-2 leading-tight">
        {item?.prompt}
      </p>
    </div>
  );
}

const SeeExampleOutputDialog = ({
  item,
  setOpen,
}: SeeExampleOutputDialogProps) => {
  return (
    <Dialog open={!!item} onOpenChange={setOpen}>
      <DialogContent className="!pt-[50px] data-[state=open]:animate-contentShow flex flex-col items-start fixed left-[50%] top-[50%] w-[100vw] max-h-[85vh] min-h-[30vh] sm:w-[100vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 border p-[25px] focus:outline-none">
        <P>{item?.prompt}</P>
        <div className="relative scrollbar-hide max-h-[400px] overflow-auto shadow-sm min-h-[350px] border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg p-1">
          <div className="absolute right-3 top-3 flex items-center justify-end">
            <Badge variant={"outline"}>{item?.output?.length} items</Badge>
          </div>
          <code>{JSON.stringify(item?.output, null, 2)}</code>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function ExampleTemplatesSection() {
  const [selectedExample, setSelectedExample] = React.useState<Preset | null>(
    null
  );

  return (
    <React.Fragment>
      <SeeExampleOutputDialog
        item={selectedExample}
        setOpen={() => setSelectedExample(null)}
      />
      <Column className="gap-2 w-full max-w-[90vw]">
        <Row className=" examples-container overflow-hidden">
          <Row className="examples-row gap-2">
            <Row className="gap-2 overflow-hidden">
              {firstRowExamples.map((item, index) => (
                <Item
                  key={`example-${item.prompt}-${index}`}
                  item={item}
                  onSelectExample={setSelectedExample}
                />
              ))}
            </Row>
            <Row className="gap-2">
              {firstRowExamples.map((item, index) => (
                <Item
                  key={`example-row-2-${item.prompt}-${index}`}
                  item={item}
                  onSelectExample={setSelectedExample}
                />
              ))}
            </Row>
          </Row>
        </Row>
        <Row className="examples-container overflow-hidden">
          <Row className="examples-row2 gap-2">
            <Row className="gap-2">
              {secondRowExamples.map((item, index) => (
                <Item
                  key={`example-${item.prompt}-${index}`}
                  item={item}
                  onSelectExample={setSelectedExample}
                />
              ))}
            </Row>
            <Row className="gap-2">
              {secondRowExamples.map((item, index) => (
                <Item
                  key={`example-row-2-${item.prompt}-${index}`}
                  item={item}
                  onSelectExample={setSelectedExample}
                />
              ))}
            </Row>
          </Row>
        </Row>
      </Column>
    </React.Fragment>
  );
}

const firstRowExamples = presets.slice(0, 4);
const secondRowExamples = presets.slice(-4);
