
import { useEffect, useRef, useState } from 'react';
import type { ReactNode, PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import './WallPage.css';

type WallWord = {
  text: ReactNode;
  to?: string;
  id?: string;
  small?: boolean;
};

function WallPage() {
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const [isDragging, setIsDragging] = useState(false);

  const hideTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const HOLD_WORD_IDS = ['linkT', 'linkT1'];
  const HOLD_TIMEOUT = 3000;

  useEffect(() => {
    alert('об этом было много мыслей, но можно ничего и не делать. (нажмите пальцем на экран, удерживайте' +
        ' его и водите вокруг, чтобы увидеть надписи)');

    return () => {
      hideTimers.current.forEach((timer) => clearTimeout(timer));
      hideTimers.current.clear();
    };
  }, []);

  const words: WallWord[] = [
    { text: 'слизать с ножа', to: '/start', id: 'linkT' },
    { text: '' },
    { text: 'сухо' },
    { text: '' },
    { text: <>ск<br />азать бы</> },

    { text: 'и порезаться языком', to: '/start', id: 'linkT1' },
    { text: '' },
    { text: '' },
    { text: 'взбухает' },
    { text: '' },

    { text: 'как-то', small: true },
    { text: '' },
    { text: 'хватит', to: '/corridor' },
    { text: <>липкая<br />лента</> },
    { text: 'опять' },

    { text: 'оно', small: true },
    { text: '' },
    { text: '' },
    { text: 'залп' },
    { text: '' },

    { text: 'дрожат' },
    { text: 'шапки гвоздей' },
    { text: <>проёмы<br />лампочек</> },
    { text: '' },
    { text: 'так', small: true },
  ];

  function handleSpecialClick() {
    sessionStorage.setItem('linkUnlockedA', 'yes');
    sessionStorage.setItem('showAppleMessage', 'yes');
  }

  function revealWord(index: number, wordId?: string) {
    setVisibleWords((previous) =>
      previous.includes(index) ? previous : [...previous, index]
    );

    if (wordId && HOLD_WORD_IDS.includes(wordId)) {
      const existingTimer = hideTimers.current.get(index);

      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = setTimeout(() => {
        setVisibleWords((previous) =>
          previous.filter((item) => item !== index)
        );

        hideTimers.current.delete(index);
      }, HOLD_TIMEOUT);

      hideTimers.current.set(index, timer);
    }
  }

  function revealWordAt(x: number, y: number) {
    const textElements = document.querySelectorAll<HTMLElement>(
      '.wall-container .wall-word-text'
    );

    textElements.forEach((element) => {
      const rects = Array.from(element.getClientRects());

      const isOverText = rects.some(
        (rect) =>
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
      );

      if (isOverText) {
        const index = Number(element.dataset.wordIndex);

        if (Number.isInteger(index) && index >= 0 && index < words.length) {
          revealWord(index, words[index].id);
        }
      }
    });
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    setIsDragging(true);
    setCursor({
      x: event.clientX,
      y: event.clientY,
      visible: true,
    });

    revealWordAt(event.clientX, event.clientY);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) {
      return;
    }

    setCursor({
      x: event.clientX,
      y: event.clientY,
      visible: true,
    });

    revealWordAt(event.clientX, event.clientY);
  }

  function handlePointerUp() {
    setIsDragging(false);
    setCursor((previous) => ({
      ...previous,
      visible: false,
    }));

    setVisibleWords((previous) =>
      previous.filter((index) => {
        const word = words[index];
        return Boolean(word?.id && HOLD_WORD_IDS.includes(word.id));
      })
    );
  }

  return (
    <div
      className="wall-page"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
    >
      <div className="wall-container">
        {words.map((word, index) => {
          const className = [
            'wall-word',
            word.small ? 'wall-word-small' : '',
            word.id ? 'wall-word-special' : '',
            visibleWords.includes(index) ? 'wall-word-visible' : '',
          ]
            .filter(Boolean)
            .join(' ');

          const content = (
            <span
              className="wall-word-text"
              data-word-index={index}
            >
              {word.text || ' '}
            </span>
          );

          if (word.to) {
            return (
              <Link
                key={word.id ?? index}
                to={word.to}
                className={className}
                onClick={() => {
                  if (word.id) {
                    handleSpecialClick();
                  }
                }}
              >
                {content}
              </Link>
            );
          }

          return (
            <a
              key={index}
              href="#"
              className={className}
              onClick={(event) => event.preventDefault()}
            >
              {content}
            </a>
          );
        })}
      </div>

      {cursor.visible && (
        <div
          className="virtual-cursor"
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default WallPage;
