"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../Dialog";
import { Input } from "../Input";

interface PlayerGimDialog {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  setName: Dispatch<SetStateAction<string>>
}

export function PlayerGimDialog(props: PlayerGimDialog) {
  const { isOpen, onClose, onConfirm, name, setName } = props;
  

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        if (!val) props.onClose();
      }}
    >
      <DialogContent className="w-[24rem]">
        <DialogHeader>
          <DialogTitle>GIM Verification</DialogTitle>
          <Input
            id="name"
            placeholder="Enter Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </DialogHeader>
        <div className="mt-3 flex justify-end gap-x-3">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} variant="blue">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
