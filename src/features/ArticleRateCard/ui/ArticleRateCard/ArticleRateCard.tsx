import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useFetchRateArticleQuery, useSendRateArticleMutation } from '../../api/articleRateApi';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { ToggleFeature } from '@/shared/lib/featureFlags';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleRateCardProps {
  className?: string;
  articleId: string;
}

export const ArticleRateCard: FC<ArticleRateCardProps> = memo((props) => {
  const { className, articleId } = props;
  const { t } = useTranslation('articles');

  const userData = useSelector(getUserAuthData);

  const { data: rateData, isLoading, isError } = useFetchRateArticleQuery({ userId: userData?.id ?? '', articleId });

  const [articleRateMutation] = useSendRateArticleMutation();

  const rating = rateData?.[0];

  const rateDataHandler = useCallback(
    (starCount: number, feedback?: string) => {
      try {
        articleRateMutation({
          articleId,
          userId: userData?.id ?? '',
          rate: starCount,
          feedback,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [articleId, articleRateMutation, userData?.id]
  );

  const acceptHandler = useCallback(
    (starCount: number, feedback?: string) => {
      rateDataHandler(starCount, feedback);
    },
    [rateDataHandler]
  );

  const cancelHandler = useCallback(
    (starCount: number) => {
      rateDataHandler(starCount);
    },
    [rateDataHandler]
  );

  if (isLoading) {
    return (
      <ToggleFeature
        name='isAppRedesigned'
        off={<SkeletonDeprecated height={120} width={'100%'} />}
        on={<Skeleton height={120} width={'100%'} />}
      />
    );
  }

  if (isError) {
    return (
      <ToggleFeature
        name='isAppRedesigned'
        off={<TextDeprecated text={t('rate_load_error')} theme='error' />}
        on={<Text text={t('rate_load_error')} theme='error' />}
      />
    );
  }

  return (
    <RatingCard
      className={className}
      title={t('rate_the_article')}
      rate={rating?.rate}
      feedbackTitle={t('input_rate')}
      hasFeedback
      onAccept={acceptHandler}
      onCancel={cancelHandler}
      data-testid='ArticleRateCard'
    />
  );
});
