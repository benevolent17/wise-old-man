"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { PlayerDetailsResponse, PlayerTypeProps } from "@wise-old-man/utils";
import { useToast } from "~/hooks/useToast";
import { useWOMClient } from "~/hooks/useWOMClient";
import { DropdownMenuItem } from "../Dropdown";

import LoadingIcon from "~/assets/loading.svg";
import { PlayerGimDialog } from "./PlayerGimDialog";

export function PlayerGimForm(props: { player: PlayerDetailsResponse }) {
  const { player } = props;

  const toast = useToast();
  const client = useWOMClient();
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false) 
  const [isTransitioning, startTransition] = useTransition();
  const [name, setName] = useState("")

  const assertMutation = useMutation({
    mutationFn: () => {
      return client.players.assertPlayerType(player.username, name);
    },
    onSuccess: (result) => {
      if (result.changed) {
        const successMessage = `${player.displayName} player type has been changed to ${
          PlayerTypeProps[result.player.type].name
        }`;

        startTransition(() => {
          router.refresh();
          toast.toast({ variant: "success", title: successMessage });
        });
      } else {
        toast.toast({
          variant: "success",
          title: `No change: ${player.displayName} is still ${PlayerTypeProps[player.type].name}`,
        });
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.toast({ variant: "error", title: error.message });
      }
    },
  });

  return (
    <>
      <PlayerGimDialog
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onConfirm={() => {
          setModalOpen(false)
          assertMutation.mutate();
        }}
        name={name}
        setName={setName}
      />
      <DropdownMenuItem
        disabled={assertMutation.isPending || isTransitioning}
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true)
        }}
      >
        {assertMutation.isPending || isTransitioning ? (
          <div className="flex animate-pulse items-center">
            <LoadingIcon className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </div>
        ) : (
          <>Update GIM Status...</>
        )}
      </DropdownMenuItem>
    </>
  );
}
