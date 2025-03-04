import { useRef, useEffect, type RefObject } from 'react';

// Events to addEventListener for if 'events' param not specified
const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: (...args: any[]) => any,
  events: string[] = DEFAULT_EVENTS
): void => {
  const onClickAwayRef = useRef(onClickAway);

  useEffect(() => {
    onClickAwayRef.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const onClickHandler = (e: Event) => {
      if (!ref.current?.contains(e.target as Node)) {
        onClickAwayRef.current(e);
      }
    };

    events.forEach((e) => document.addEventListener(e, onClickHandler));

    return () => {
      events.forEach((e) => document.removeEventListener(e, onClickHandler));
    };
  }, [ref, events]);
};

export default useOnClickOutside;
