import { Keyword } from '@/payload-types';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import KeywordBadge from './keyword';
import { default as RichTextViewer } from './richText';

type CardTextProps = {
  cardText: SerializedEditorState | null | undefined;
  keywords: (number | Keyword)[] | null | undefined;
  showReminders: boolean;
  className?: string;
};

export default function CardText({
  cardText,
  keywords,
  showReminders,
  className,
}: CardTextProps) {
  let prefixText: SerializedEditorState[] = [];
  let suffixText: SerializedEditorState[] = [];

  const nonEffectKeywords =
    keywords &&
    keywords.length > 0 &&
    keywords
      .filter((keyword) => typeof keyword !== 'number')
      .filter((keyword) => keyword.type !== 'Effect');

  const groupedEffects =
    keywords &&
    keywords.length > 0 &&
    keywords
      .filter((keyword) => typeof keyword !== 'number')
      .filter((keyword) => keyword.type === 'Effect');

  if (showReminders && groupedEffects && groupedEffects.length > 0) {
    prefixText = groupedEffects
      .filter(
        (keyword): keyword is Keyword =>
          typeof keyword !== 'number' &&
          keyword.position === 'prefix' &&
          keyword.reminder_text !== undefined
      )
      .map((keyword) => {
        return keyword.reminder_text as SerializedEditorState;
      });

    suffixText = groupedEffects
      .filter(
        (keyword): keyword is Keyword =>
          typeof keyword !== 'number' &&
          keyword.position === 'suffix' &&
          keyword.reminder_text !== undefined
      )
      .map((keyword) => {
        return keyword.reminder_text as SerializedEditorState;
      });
  }

  return (
    <div className={className}>
      {nonEffectKeywords &&
        nonEffectKeywords.map(({ keyword, color, reminder_text }, index) => {
          return (
            <div key={index}>
              <KeywordBadge label={keyword as string} color={color as string} />
              <span>{'('}</span>
              <RichTextViewer
                className="inline"
                key={index}
                data={reminder_text as SerializedEditorState}
                enableInline={true}
                enableGutter={false}
                enableProse={false}
              />
              <span>{')'}</span>
            </div>
          );
        })}

      {groupedEffects &&
        groupedEffects.map((keyword, index) => {
          return (
            <KeywordBadge
              key={index}
              label={(keyword as Keyword).keyword as string}
              color={(keyword as Keyword).color as string}
            />
          );
        })}

      {showReminders && prefixText.length > 0 && (
        <>
          {'('}
          {prefixText.map((text, index, { length }) => {
            return (
              <span key={length}>
                <RichTextViewer
                  className="inline"
                  key={index}
                  data={text}
                  enableInline={true}
                  enableGutter={false}
                  enableProse={false}
                />
                {index !== length - 1 && <span className="mr-1"></span>}
              </span>
            );
          })}
          {')'}
          <br />
        </>
      )}

      {cardText && (
        <RichTextViewer
          className="inline mr-1"
          data={cardText}
          enableInline={true}
          enableGutter={false}
          enableProse={false}
        />
      )}

      {showReminders && suffixText.length > 0 && (
        <span>
          <span>{'('}</span>
          {suffixText.map((text, index, { length }) => {
            return (
              <span key={index}>
                <RichTextViewer
                  className="inline"
                  key={index}
                  data={text}
                  enableInline={true}
                  enableGutter={false}
                  enableProse={false}
                />
                {index !== length - 1 && <span className="mr-1"></span>}
              </span>
            );
          })}
          <span>{')'}</span>
        </span>
      )}
    </div>
  );
}
