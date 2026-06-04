import generated from './cms-lash-menu.generated.json';

export type LpGoogleReviewTrust = {
  count: number;
  countPlus: string;
  overVerifiedLabel: string;
  shortHeroLabel: string;
  trustedByHeading: string;
  whyChooseTitle: string;
  whyChooseFoot: string;
};

const FALLBACK: LpGoogleReviewTrust = {
  count: 105,
  countPlus: '105+',
  overVerifiedLabel: 'Over 105 5-Star Google Verified Reviews',
  shortHeroLabel: '105+ Google reviews',
  trustedByHeading: 'Trusted by 105+ Brighton Clients',
  whyChooseTitle: 'Over 105 5-Star Google Reviews',
  whyChooseFoot: 'Join 105+ five-star Google clients who trust us with their lash transformations.',
};

const fromCms = (generated as { googleReviews?: Partial<LpGoogleReviewTrust> }).googleReviews;

export const LP_GOOGLE_REVIEW_TRUST: LpGoogleReviewTrust = {
  ...FALLBACK,
  ...(fromCms?.count ? fromCms : {}),
  count: fromCms?.count && fromCms.count > 0 ? fromCms.count : FALLBACK.count,
  countPlus: fromCms?.countPlus || FALLBACK.countPlus,
  overVerifiedLabel: fromCms?.overVerifiedLabel || FALLBACK.overVerifiedLabel,
  shortHeroLabel: fromCms?.shortHeroLabel || FALLBACK.shortHeroLabel,
  trustedByHeading: fromCms?.trustedByHeading || FALLBACK.trustedByHeading,
  whyChooseTitle: fromCms?.whyChooseTitle || FALLBACK.whyChooseTitle,
  whyChooseFoot: fromCms?.whyChooseFoot || FALLBACK.whyChooseFoot,
};
