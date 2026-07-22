"use client";

import { type MouseEvent, useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import type { TravelGroup, Traveler } from "@/types/trip";

type CompactLayout = "tile" | "wide";

interface MentawaiPanelProps {
  group: TravelGroup;
  compactLayout?: CompactLayout;
}

function getInitials(name: string) {
  return name.slice(0, 2).toLocaleUpperCase("es-ES");
}

function TravelerPortrait({
  member,
  compact = false,
  decorative = false,
}: {
  member: Traveler;
  compact?: boolean;
  decorative?: boolean;
}) {
  const [failedImage, setFailedImage] = useState<string>();
  const showImage = failedImage !== member.image;

  return (
    <span
      aria-hidden={decorative || undefined}
      aria-label={!decorative && !showImage ? member.imageAlt : undefined}
      role={!decorative && !showImage ? "img" : undefined}
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden bg-[#e4f1ec] font-black text-[#147d76]",
        compact
          ? "size-7 rounded-full border-2 border-[#fffdf7] text-[.52rem] tracking-[-.02em] shadow-sm"
          : "aspect-square w-full rounded-[1.2rem] text-xl",
      )}
    >
      <span aria-hidden='true'>{getInitials(member.name)}</span>
      {showImage ? (
        // Una imagen normal permite retirar por completo el archivo si todavía no existe.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.image}
          alt={decorative ? "" : member.imageAlt}
          loading='lazy'
          decoding='async'
          className='absolute inset-0 size-full object-cover'
          style={{ objectPosition: member.imagePosition ?? "center" }}
          onError={(event) => {
            event.currentTarget.style.display = "none";
            setFailedImage(member.image);
          }}
        />
      ) : null}
    </span>
  );
}

function AvatarStack({ group }: { group: TravelGroup }) {
  return (
    <span aria-hidden='true' className='flex -space-x-2.5'>
      {group.members.map((member) => (
        <TravelerPortrait key={member.id} member={member} compact decorative />
      ))}
    </span>
  );
}

export function MentawaiPanel({ group, compactLayout = "tile" }: MentawaiPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const idSuffix = useId().replaceAll(":", "");
  const dialogId = "travel-group-" + idSuffix;
  const titleId = dialogId + "-title";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function openDialog() {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();
    setIsOpen(true);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
  }

  function closeDialog() {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }
  }

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  }

  function handleDialogClose() {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <>
      <button
        ref={triggerRef}
        type='button'
        aria-controls={dialogId}
        aria-expanded={isOpen}
        aria-haspopup='dialog'
        aria-label={"Abrir el grupo " + group.name}
        onClick={openDialog}
        className={cn(
          "group relative flex h-full w-full rounded-[1.6rem] border border-[#ded6c9] bg-[#fffdf7] text-left text-[#0b3157] shadow-[0_12px_28px_rgba(26,54,75,.065)] transition-[transform,background-color,border-color,box-shadow] hover:border-[#b9cec6] hover:bg-white hover:shadow-[0_16px_34px_rgba(26,54,75,.1)] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]",
          compactLayout === "tile"
            ? "min-h-24 flex-row items-center justify-between gap-4 p-4 min-[360px]:min-h-32 min-[360px]:flex-col min-[360px]:items-start min-[360px]:gap-3 min-[360px]:p-3.5"
            : "min-h-24 flex-row items-center justify-between gap-4 p-4 lg:min-h-full lg:flex-col lg:items-start lg:p-4",
        )}
      >
        <span className='min-w-0 pr-5'>
          <span className='flex items-center gap-1.5 text-[.58rem] font-extrabold uppercase tracking-[.14em] text-[#147d76]'>
            <Icon name='users' className='size-3.5' strokeWidth={2.1} />
            Cuadrilla
          </span>
          <strong className='mt-1 block truncate text-base leading-tight tracking-[-.02em] min-[400px]:text-lg'>
            {group.name}
          </strong>
        </span>
        <AvatarStack group={group} />
        <Icon
          name='chevron'
          className='absolute right-3 top-3 size-4 -rotate-90 text-[#7b8a92] transition-transform group-hover:translate-x-0.5'
          strokeWidth={2.2}
        />
      </button>

      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-labelledby={titleId}
        aria-modal='true'
        onClick={handleDialogClick}
        onClose={handleDialogClose}
        className={cn(
          "fixed inset-x-0 bottom-0 top-auto m-0 max-h-[calc(100dvh-1rem)] w-full max-w-none overflow-y-auto overscroll-contain rounded-t-[2rem] border border-[#e5ddcf] bg-[#fffdf7] p-0 text-[#173342] shadow-[0_-18px_60px_rgba(7,31,55,.28)] backdrop:bg-[#071f37]/65 backdrop:backdrop-blur-[2px] sm:inset-0 sm:m-auto sm:max-h-[min(42rem,calc(100dvh-2rem))] sm:w-[calc(100%-2rem)] sm:max-w-md sm:rounded-[2rem] sm:shadow-[0_24px_80px_rgba(7,31,55,.3)]",
          isOpen && "animate-rise",
        )}
      >
        <div className='mx-auto mt-2 h-1 w-10 rounded-full bg-[#d7d1c6] sm:hidden' />
        <header className='flex items-center gap-3 px-5 pb-4 pt-4 sm:px-6 sm:pt-6'>
          <span className='grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-[#e4f1ec] text-[#147d76]'>
            <img
              src='/images/icons/mentawai.webp'
              alt=''
              className='size-full object-cover'
              loading='lazy'
              decoding='async'
            />
          </span>
          <div className='min-w-0 flex-1'>
            <p className='text-[.62rem] font-extrabold uppercase tracking-[.15em] text-[#7b8a92]'>Cuadrilla</p>
            <h2 id={titleId} className='mt-0.5 truncate text-2xl font-black tracking-[-.03em] text-[#0b3157]'>
              {group.name}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type='button'
            aria-label={"Cerrar el grupo " + group.name}
            onClick={closeDialog}
            className='grid size-11 shrink-0 place-items-center rounded-full bg-[#f4efe4] text-[#526773] transition-colors hover:bg-[#e8e0d2] hover:text-[#0b3157] active:bg-[#ddd3c2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]'
          >
            <Icon name='close' className='size-5' strokeWidth={2.2} />
          </button>
        </header>

        <div className='grid grid-cols-2 gap-3 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6'>
          {group.members.map((member) => (
            <article
              key={member.id}
              className='min-w-0 rounded-[1.45rem] border border-[#e8e1d6] bg-white p-2.5 shadow-[0_10px_24px_rgba(26,54,75,.06)]'
            >
              <TravelerPortrait member={member} />
              <h3 className='mt-2.5 truncate px-1 pb-0.5 text-center text-sm font-black text-[#0b3157] sm:text-base'>
                {member.name}
              </h3>
            </article>
          ))}
        </div>
      </dialog>
    </>
  );
}
