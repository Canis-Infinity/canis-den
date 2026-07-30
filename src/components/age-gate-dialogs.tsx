"use client"

import { PawPrint, ShieldAlert } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Dictionary } from "@/i18n/types"

export function AgeGateDialogs({
  promptOpen,
  deniedOpen,
  prompt,
  denied,
  onConfirm,
  onDeny,
  onChooseGeneral,
  onChooseWork,
}: {
  promptOpen: boolean
  deniedOpen: boolean
  prompt: Dictionary["agePrompt"]
  denied: Dictionary["ageDenied"]
  onConfirm: () => void
  onDeny: () => void
  onChooseGeneral: () => void
  onChooseWork: () => void
}) {
  return (
    <>
      <AlertDialog
        open={promptOpen}
        onOpenChange={(open) => {
          if (!open) onDeny()
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <ShieldAlert />
            </AlertDialogMedia>
            <AlertDialogTitle>{prompt.title}</AlertDialogTitle>
            <AlertDialogDescription>{prompt.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onDeny}>
              {prompt.cancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              {prompt.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={deniedOpen}
        onOpenChange={(open) => {
          if (!open) onDeny()
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <PawPrint />
            </AlertDialogMedia>
            <AlertDialogTitle>{denied.title}</AlertDialogTitle>
            <AlertDialogDescription>{denied.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction variant="outline" onClick={onChooseGeneral}>
              {denied.chooseGeneral}
            </AlertDialogAction>
            <AlertDialogAction onClick={onChooseWork}>
              {denied.chooseWork}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
