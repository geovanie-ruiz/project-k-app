'use client';

import CardText from '@/components/custom/cardText';
import Icon, { ICON_KEYS } from '@/components/icons/ComponentIcon';
import MightIcon from '@/components/icons/MightIcon';
import { Card, Media, Set, Tag } from '@/payload-types';
import { formatSetId } from '@/utils/utils';
import { CldImage } from 'next-cloudinary';
import { getCardColorBG } from '../../_actions/getCardColor';

export function CardPage({ card }: { card: Card }) {
  const cardArt = card.card_art as Media;
  const setCode = (card.set as Set).set_code;
  const setTotal = (card.set as Set).total;
  const cycleRunes =
    card.recycle &&
    card.recycle.map((cost) => cost.rune).filter((rune) => !!rune);

  return (
    <div
      key={card.id}
      className="mx-auto w-full max-w-screen-xl px-4 mb-4 flex flex-col-reverse md:flex-row gap-2"
    >
      <div className="w-full md:w-3/12">
        <CldImage
          src={cardArt?.filename ?? 'cardback-blue'}
          alt={card.full_card_name || 'Art for Unknown Card'}
          width={1000}
          height={800}
          // gravity="auto"
          className="rounded-xl px-1"
        />
        {/* Cropped image for mobile */}
        {/* <Image
          src="https://res.cloudinary.com/cdwiki/image/upload/c_crop,x_80,y_70,w_320,h_180/v1734044655/25c6059a82e7081902b57dd03644668e.jpg"
          alt="---CARDTITLE--"
          width={1000}
          height={800}
          className="sm:hidden"
        />*/}
      </div>
      <div className="w-full md:w-9/12 rounded-md my-1">
        <div
          className={`${getCardColorBG(card.rune)} w-full rounded-t p-2 flex justify-between content-center`}
        >
          <h1 className="text-white text-3xl text-shadow albert-sans">
            {card.full_card_name || 'Art for Unknown Card'}
          </h1>
          <div className="flex-row">
            <div className="bg-black text-white rounded px-2 text-xs font-semibold text-center">
              {formatSetId(setCode, setTotal, card.set_index)}
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="flex mt-2">
            <div className="w-3/6">
              <div className="z-0 flex items-center ml-1 -m-px">
                <label className=" bg-content_light-500 dark:bg-content-500  text-xs font-semibold border-content2 px-1 rounded-t">
                  CARD TYPE
                </label>
              </div>
              <div className="rounded bg-content_light-500 dark:bg-content-500 px-4 uppercase flex items-center pb-0.5 tracking-widest gap-2">
                <Icon iconType={card.type.toLowerCase() as ICON_KEYS} />
                {card.type}
              </div>
            </div>
            <div className="w-3/6">
              <div className="flex items-center ml-1 -m-px">
                <label
                  className={`${getCardColorBG(card.rune)} text-xs font-semibold text-white border-content2 px-1 rounded-t`}
                >
                  RUNE
                </label>
              </div>
              <div
                className={`${getCardColorBG(card.rune)} px-4 uppercase flex items-center pb-0.5 tracking-widest text-white rounded`}
              >
                {card.rune &&
                  card.rune.map((rune, index) => (
                    <div key={`rune-${index}`} className="flex flex-row pr-1">
                      <Icon iconType={rune.toLowerCase() as ICON_KEYS} />
                      <span className="px-1">{rune}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap mt-2">
            {card.might && (
              <div className="w-2/6 md:w-1/6">
                <div className="flex items-center ml-2.5 -m-px">
                  <label className="bg-content_light-500 dark:bg-content-500 text-xs font-semibold border-content3 px-1 border border-b-0 rounded-t">
                    <div className="flex items-center gap-2">
                      <MightIcon />
                      MIGHT
                    </div>
                  </label>
                </div>
                <div className="mx-0.5 h-8 bg-content_light-500 dark:bg-content-500 rounded border border-content3 flex items-center justify-center font-semibold text-lg ">
                  {card.might}
                </div>
              </div>
            )}
            {card.cost && (
              <div className="w-2/6 md:w-1/6">
                <div className="flex items-center ml-2.5 -m-px">
                  <label className="bg-content_light-500 dark:bg-content-500 text-xs font-semibold border-content3 px-1 border border-b-0 rounded-t">
                    COST
                  </label>
                </div>
                <div className="mx-0.5 h-8 bg-content_light-500 dark:bg-content-500 rounded border border-content3 flex items-center justify-center font-semibold text-lg ">
                  {card.cost}
                </div>
              </div>
            )}
            {cycleRunes && cycleRunes.length > 0 && (
              <div className="w-2/6 md:w-1/6">
                <div className="flex items-center ml-2.5 -m-px">
                  <label className="bg-content_light-500 dark:bg-content-500 text-xs font-semibold border-content3 px-1 border border-b-0 rounded-t">
                    CYCLE
                  </label>
                </div>
                <div className="mx-0.5 h-8 bg-content_light-500 dark:bg-content-500 rounded border border-content3 flex items-center justify-center ">
                  {cycleRunes.map((rune, index) => (
                    <div key={`cycle-${index}`}>
                      <Icon iconType={rune.toLowerCase() as ICON_KEYS} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="md:w-3/6 mt-1 md:mt-0">
              <div className="flex items-center ml-1 -m-px">
                <label className="text-xs font-semibold px-1 border">
                  TAGS
                </label>
              </div>
              <div className="mx-1 h-8 flex items-center flex-wrap">
                {card.tags?.map((tag, index) => (
                  <div
                    key={`tag-${index}`}
                    className="bg-slate-950 rounded-md mx-1 text-center text-white text-sm font-semibold px-1 py-0.5 border-slate-600 border"
                  >
                    {(tag as Tag).tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {card.abilities_text && (
            <div className="mt-2">
              <div className="flex items-center ml-1 -m-px">
                <label className=" bg-content_light-500 dark:bg-content-500  text-xs font-semibold border-content2 px-1 rounded-t">
                  EFFECT
                </label>
              </div>
              <div className="rounded bg-content_light-500 dark:bg-content-500 px-2 py-1 md:px-3">
                <CardText
                  cardText={card.abilities}
                  keywords={card.keywords}
                  showReminders={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
