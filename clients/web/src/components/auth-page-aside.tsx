import { Button } from "@design-system/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@design-system/components/ui/card";
import { AuthProviderButton } from "auth/components";
import { type SupportedLanguage, supportedLanguages } from "i18n";
import { useTranslation } from "react-i18next";
import { useFeaturedPokemon } from "../hooks/use-poke-api";
import type { AuthMode, AuthProvider } from "../hooks/use-auth-page-controller";

interface AuthPageAsideProps {
  currentLanguage: SupportedLanguage;
  isLoading: boolean;
  mode: AuthMode;
  onLanguageChange: (language: SupportedLanguage) => void;
  onProviderClick: (provider: AuthProvider) => void | Promise<void>;
  status?: string;
}

const pillButtonClassName =
  "rounded-full border-black/10 bg-white px-4 text-black shadow-none hover:border-black hover:bg-black hover:text-white";

export function AuthPageAside({
  currentLanguage,
  isLoading,
  mode,
  onLanguageChange,
  onProviderClick,
  status,
}: AuthPageAsideProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <FeaturedPokemonCard />
      <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
      <AuthHighlightsCard />
      <ProviderActionsCard mode={mode} isLoading={isLoading} onProviderClick={onProviderClick} status={status} />
    </div>
  );
}

function FeaturedPokemonCard() {
  const { t } = useTranslation("web");
  const featuredPokemonQuery = useFeaturedPokemon();

  return (
    <Card className="overflow-hidden border-black/10 bg-white/78 shadow-[0_16px_50px_rgba(33,24,14,0.05)] backdrop-blur">
      <CardHeader className="gap-3 border-b border-black/8 pb-5">
        <CardTitle className="text-2xl leading-none tracking-[-0.04em] text-black">
          {t(($) => $.ORPC_DEMO_TITLE)}
        </CardTitle>
        <CardDescription className="max-w-2xl text-sm leading-6 text-black/60">
          {t(($) => $.ORPC_DEMO_DESCRIPTION)}
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              void featuredPokemonQuery.refetch();
            }}
            disabled={featuredPokemonQuery.isFetching}
            className={pillButtonClassName}
          >
            {featuredPokemonQuery.isFetching ? t(($) => $.ORPC_DEMO_REFRESH_LOADING) : t(($) => $.ORPC_DEMO_REFRESH)}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-3 pb-1 text-sm text-black/65 sm:grid-cols-3">
        {featuredPokemonQuery.isPending ? (
          <div className="sm:col-span-3">
            <p className="rounded-[1.35rem] border border-black/10 bg-black/3 px-4 py-3 leading-6 text-black/60">
              {t(($) => $.ORPC_DEMO_LOADING)}
            </p>
          </div>
        ) : null}

        {featuredPokemonQuery.isError ? (
          <div className="sm:col-span-3">
            <p className="rounded-[1.35rem] border border-rose-200 bg-rose-50 px-4 py-3 leading-6 text-rose-700">
              {t(($) => $.ORPC_DEMO_ERROR)}
            </p>
          </div>
        ) : null}

        {featuredPokemonQuery.data ? (
          <>
            <PokemonMetric label={t(($) => $.ORPC_DEMO_NAME_LABEL)} value={featuredPokemonQuery.data.name} capitalize />
            <PokemonMetric label={t(($) => $.ORPC_DEMO_HEIGHT_LABEL)} value={featuredPokemonQuery.data.height} />
            <PokemonMetric label={t(($) => $.ORPC_DEMO_WEIGHT_LABEL)} value={featuredPokemonQuery.data.weight} />
            {featuredPokemonQuery.data.artworkUrl ? (
              <div className="sm:col-span-3">
                <div className="flex items-center gap-4 rounded-[1.35rem] border border-black/10 bg-black/3 p-4">
                  <img
                    src={featuredPokemonQuery.data.artworkUrl}
                    alt={featuredPokemonQuery.data.name}
                    className="h-20 w-20 rounded-2xl bg-white object-contain p-2"
                  />
                  <p className="text-sm leading-6 text-black/60">{t(($) => $.ORPC_DEMO_FOOTNOTE)}</p>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

interface PokemonMetricProps {
  capitalize?: boolean;
  label: string;
  value: number | string;
}

function PokemonMetric({ capitalize = false, label, value }: PokemonMetricProps) {
  return (
    <div className="rounded-[1.35rem] border border-black/10 bg-black/3 p-4">
      <p className="mb-2 text-xs font-semibold tracking-[0.24em] text-black/45 uppercase">{label}</p>
      <p className={`text-lg font-semibold text-black${capitalize ? " capitalize" : ""}`}>{value}</p>
    </div>
  );
}

interface LanguageSwitcherProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const { t } = useTranslation("web");

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-black/10 bg-white/78 p-4 shadow-[0_16px_50px_rgba(33,24,14,0.05)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-semibold tracking-[0.24em] text-black/55 uppercase">{t(($) => $.LANGUAGE_LABEL)}</span>
      <div className="flex flex-wrap items-center gap-2">
        {supportedLanguages.map((language) => (
          <Button
            key={language}
            type="button"
            size="sm"
            variant={language === currentLanguage ? "default" : "outline"}
            onClick={() => onLanguageChange(language)}
            aria-pressed={language === currentLanguage}
            className={`min-w-24 ${pillButtonClassName}`}
          >
            {language === "en" ? t(($) => $.LANGUAGE_ENGLISH) : t(($) => $.LANGUAGE_FRENCH)}
          </Button>
        ))}
      </div>
    </div>
  );
}

function AuthHighlightsCard() {
  const { t } = useTranslation("web");

  return (
    <Card className="overflow-hidden border-black/10 bg-[#171717] text-white shadow-[0_28px_90px_rgba(17,17,17,0.18)]">
      <CardHeader className="gap-3 border-b border-white/10 pb-5">
        <CardTitle className="text-3xl leading-none tracking-[-0.04em] text-white">
          {t(($) => $.AUTH_PANEL_TITLE)}
        </CardTitle>
        <CardDescription className="max-w-2xl text-base leading-7 text-white/68">
          {t(($) => $.AUTH_PANEL_DESCRIPTION)}
        </CardDescription>
        <CardAction>
          <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.24em] text-white uppercase backdrop-blur">
            {t(($) => $.AUTH_PANEL_BADGE)}
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-3 pb-1 text-sm text-white/68 sm:grid-cols-3">
        <HighlightFeature
          title={t(($) => $.AUTH_PANEL_FEATURE_ONE_TITLE)}
          description={t(($) => $.AUTH_PANEL_FEATURE_ONE_DESCRIPTION)}
        />
        <HighlightFeature
          title={t(($) => $.AUTH_PANEL_FEATURE_TWO_TITLE)}
          description={t(($) => $.AUTH_PANEL_FEATURE_TWO_DESCRIPTION)}
        />
        <HighlightFeature
          title={t(($) => $.AUTH_PANEL_FEATURE_THREE_TITLE)}
          description={t(($) => $.AUTH_PANEL_FEATURE_THREE_DESCRIPTION)}
        />
      </CardContent>
    </Card>
  );
}

interface HighlightFeatureProps {
  description: string;
  title: string;
}

function HighlightFeature({ description, title }: HighlightFeatureProps) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4">
      <p className="mb-2 text-base font-semibold text-white">{title}</p>
      <p className="leading-6">{description}</p>
    </div>
  );
}

interface ProviderActionsCardProps {
  isLoading: boolean;
  mode: AuthMode;
  onProviderClick: (provider: AuthProvider) => void | Promise<void>;
  status?: string;
}

function ProviderActionsCard({ isLoading, mode, onProviderClick, status }: ProviderActionsCardProps) {
  const { t } = useTranslation("auth");

  const action = mode === "signin" ? t(($) => $.AUTH_ACTION_SIGN_IN) : t(($) => $.AUTH_ACTION_SIGN_UP);
  const googleProvider = t(($) => $.AUTH_PROVIDER_GOOGLE);
  const githubProvider = t(($) => $.AUTH_PROVIDER_GITHUB);

  return (
    <div className="rounded-3xl border border-black/10 bg-white/78 p-4 shadow-[0_16px_50px_rgba(33,24,14,0.05)] backdrop-blur">
      <div className="grid gap-3 sm:grid-cols-2">
        <AuthProviderButton
          provider="google"
          label={t(($) => $.AUTH_PROVIDER_BUTTON, {
            action,
            provider: googleProvider,
          })}
          onSignIn={() => onProviderClick("google")}
          isLoading={isLoading}
        />
        <AuthProviderButton
          provider="github"
          label={t(($) => $.AUTH_PROVIDER_BUTTON, {
            action,
            provider: githubProvider,
          })}
          onSignIn={() => onProviderClick("github")}
          isLoading={isLoading}
        />
      </div>

      {status ? (
        <p className="mt-3 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
          {status}
        </p>
      ) : null}
    </div>
  );
}