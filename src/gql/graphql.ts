import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Card = {
  __typename?: 'Card';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  sourceLanguage?: Maybe<Language>;
  targetLanguage?: Maybe<Language>;
  textColor?: Maybe<Scalars['String']['output']>;
  translatedTextColor?: Maybe<Scalars['String']['output']>;
  translation?: Maybe<Translation>;
  user?: Maybe<User>;
};

export type GenerateCardsInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  sourceLanguage?: InputMaybe<Language>;
  spreadsheetUrl?: InputMaybe<Scalars['String']['input']>;
  targetLanguage?: InputMaybe<Language>;
  textColor?: InputMaybe<Scalars['String']['input']>;
  translatedTextColor?: InputMaybe<Scalars['String']['input']>;
  translations: Array<GenerateCardsTranslationsInput>;
};

export type GenerateCardsTranslationsInput = {
  text?: InputMaybe<Scalars['String']['input']>;
  translatedText?: InputMaybe<Scalars['String']['input']>;
};

export enum Language {
  Afrikaans = 'AFRIKAANS',
  Albanian = 'ALBANIAN',
  Amharic = 'AMHARIC',
  Arabic = 'ARABIC',
  Armenian = 'ARMENIAN',
  Azerbaijani = 'AZERBAIJANI',
  Basque = 'BASQUE',
  Belarusian = 'BELARUSIAN',
  Bengali = 'BENGALI',
  Bosnian = 'BOSNIAN',
  Bulgarian = 'BULGARIAN',
  Catalan = 'CATALAN',
  Cebuano = 'CEBUANO',
  Cherokee = 'CHEROKEE',
  ChineseSimplified = 'CHINESE_SIMPLIFIED',
  ChineseTraditional = 'CHINESE_TRADITIONAL',
  Croatian = 'CROATIAN',
  Czech = 'CZECH',
  Danish = 'DANISH',
  Dutch = 'DUTCH',
  English = 'ENGLISH',
  Esperanto = 'ESPERANTO',
  Estonian = 'ESTONIAN',
  Filipino = 'FILIPINO',
  Finnish = 'FINNISH',
  French = 'FRENCH',
  Galician = 'GALICIAN',
  Georgian = 'GEORGIAN',
  German = 'GERMAN',
  Greek = 'GREEK',
  Gujarati = 'GUJARATI',
  Hausa = 'HAUSA',
  Hebrew = 'HEBREW',
  Hindi = 'HINDI',
  Hungarian = 'HUNGARIAN',
  Icelandic = 'ICELANDIC',
  Igbo = 'IGBO',
  Indonesian = 'INDONESIAN',
  Irish = 'IRISH',
  Italian = 'ITALIAN',
  Japanese = 'JAPANESE',
  Kannada = 'KANNADA',
  Kazakh = 'KAZAKH',
  Khmer = 'KHMER',
  Korean = 'KOREAN',
  Kyrgyz = 'KYRGYZ',
  Laothian = 'LAOTHIAN',
  Latin = 'LATIN',
  Latvian = 'LATVIAN',
  Lithuanian = 'LITHUANIAN',
  Macedonian = 'MACEDONIAN',
  Malagasy = 'MALAGASY',
  Malay = 'MALAY',
  Malayalam = 'MALAYALAM',
  Maltese = 'MALTESE',
  Maori = 'MAORI',
  Marathi = 'MARATHI',
  Mongolian = 'MONGOLIAN',
  Nepali = 'NEPALI',
  Norwegian = 'NORWEGIAN',
  Pashto = 'PASHTO',
  Persian = 'PERSIAN',
  Polish = 'POLISH',
  Portuguese = 'PORTUGUESE',
  Romanian = 'ROMANIAN',
  Russian = 'RUSSIAN',
  ScotsGaelic = 'SCOTS_GAELIC',
  Serbian = 'SERBIAN',
  Slovak = 'SLOVAK',
  Slovenian = 'SLOVENIAN',
  Somali = 'SOMALI',
  Spanish = 'SPANISH',
  Sundanese = 'SUNDANESE',
  Swahili = 'SWAHILI',
  Swedish = 'SWEDISH',
  Tagalog = 'TAGALOG',
  Tajik = 'TAJIK',
  Tamil = 'TAMIL',
  Tatar = 'TATAR',
  Telugu = 'TELUGU',
  Thai = 'THAI',
  Turkish = 'TURKISH',
  Ukrainian = 'UKRAINIAN',
  Urdu = 'URDU',
  Uzbek = 'UZBEK',
  Vietnamese = 'VIETNAMESE',
  Welsh = 'WELSH',
  Yiddish = 'YIDDISH',
  Yoruba = 'YORUBA',
  Zulu = 'ZULU'
}

export type Mutation = {
  __typename?: 'Mutation';
  deleteCard?: Maybe<Scalars['String']['output']>;
  generateCards: Array<Card>;
  updateCard?: Maybe<Card>;
};


export type MutationDeleteCardArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGenerateCardsArgs = {
  input: GenerateCardsInput;
};


export type MutationUpdateCardArgs = {
  input: UpdateCardInput;
};

export type Query = {
  __typename?: 'Query';
  getCardById?: Maybe<Card>;
  getCards: Array<Card>;
};


export type QueryGetCardByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Translation = {
  __typename?: 'Translation';
  id: Scalars['ID']['output'];
  sourceLanguage?: Maybe<Language>;
  targetLanguage?: Maybe<Language>;
  text?: Maybe<Scalars['String']['output']>;
  translatedText?: Maybe<Scalars['String']['output']>;
};

export type UpdateCardInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  textColor?: InputMaybe<Scalars['String']['input']>;
  translatedTextColor?: InputMaybe<Scalars['String']['input']>;
  translation?: InputMaybe<UpdateTranslationInput>;
};

export type UpdateTranslationInput = {
  id: Scalars['ID']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  translatedText?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
};

export type DeleteCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCardMutation = { __typename?: 'Mutation', deleteCard?: string | null };

export type GenerateCardsMutationVariables = Exact<{
  input: GenerateCardsInput;
}>;


export type GenerateCardsMutation = { __typename?: 'Mutation', generateCards: Array<{ __typename?: 'Card', id: string, backgroundColor?: string | null, textColor?: string | null, translatedTextColor?: string | null, translation?: { __typename?: 'Translation', id: string, sourceLanguage?: Language | null, targetLanguage?: Language | null, text?: string | null, translatedText?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null } | null }> };

export type UpdateCardMutationVariables = Exact<{
  input: UpdateCardInput;
}>;


export type UpdateCardMutation = { __typename?: 'Mutation', updateCard?: { __typename?: 'Card', id: string, backgroundColor?: string | null, textColor?: string | null, translatedTextColor?: string | null, translation?: { __typename?: 'Translation', id: string, text?: string | null, translatedText?: string | null } | null } | null };

export type GetCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCardsQuery = { __typename?: 'Query', getCards: Array<{ __typename?: 'Card', id: string, backgroundColor?: string | null, textColor?: string | null, translatedTextColor?: string | null, translation?: { __typename?: 'Translation', id: string, sourceLanguage?: Language | null, targetLanguage?: Language | null, text?: string | null, translatedText?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null } | null }> };


export const DeleteCardDocument = gql`
    mutation DeleteCard($id: ID!) {
  deleteCard(id: $id)
}
    `;
export type DeleteCardMutationFn = Apollo.MutationFunction<DeleteCardMutation, DeleteCardMutationVariables>;

/**
 * __useDeleteCardMutation__
 *
 * To run a mutation, you first call `useDeleteCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCardMutation, { data, loading, error }] = useDeleteCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCardMutation, DeleteCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, options);
      }
export type DeleteCardMutationHookResult = ReturnType<typeof useDeleteCardMutation>;
export type DeleteCardMutationResult = Apollo.MutationResult<DeleteCardMutation>;
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<DeleteCardMutation, DeleteCardMutationVariables>;
export const GenerateCardsDocument = gql`
    mutation GenerateCards($input: GenerateCardsInput!) {
  generateCards(input: $input) {
    id
    backgroundColor
    textColor
    translatedTextColor
    translation {
      id
      sourceLanguage
      targetLanguage
      text
      translatedText
    }
    user {
      id
      firstName
      lastName
      email
    }
  }
}
    `;
export type GenerateCardsMutationFn = Apollo.MutationFunction<GenerateCardsMutation, GenerateCardsMutationVariables>;

/**
 * __useGenerateCardsMutation__
 *
 * To run a mutation, you first call `useGenerateCardsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateCardsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateCardsMutation, { data, loading, error }] = useGenerateCardsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateCardsMutation(baseOptions?: Apollo.MutationHookOptions<GenerateCardsMutation, GenerateCardsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateCardsMutation, GenerateCardsMutationVariables>(GenerateCardsDocument, options);
      }
export type GenerateCardsMutationHookResult = ReturnType<typeof useGenerateCardsMutation>;
export type GenerateCardsMutationResult = Apollo.MutationResult<GenerateCardsMutation>;
export type GenerateCardsMutationOptions = Apollo.BaseMutationOptions<GenerateCardsMutation, GenerateCardsMutationVariables>;
export const UpdateCardDocument = gql`
    mutation UpdateCard($input: UpdateCardInput!) {
  updateCard(input: $input) {
    id
    backgroundColor
    textColor
    translatedTextColor
    translation {
      id
      text
      translatedText
    }
  }
}
    `;
export type UpdateCardMutationFn = Apollo.MutationFunction<UpdateCardMutation, UpdateCardMutationVariables>;

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCardMutation, UpdateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument, options);
      }
export type UpdateCardMutationHookResult = ReturnType<typeof useUpdateCardMutation>;
export type UpdateCardMutationResult = Apollo.MutationResult<UpdateCardMutation>;
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<UpdateCardMutation, UpdateCardMutationVariables>;
export const GetCardsDocument = gql`
    query GetCards {
  getCards {
    id
    backgroundColor
    textColor
    translatedTextColor
    translation {
      id
      sourceLanguage
      targetLanguage
      text
      translatedText
    }
    user {
      id
      firstName
      lastName
      email
    }
  }
}
    `;

/**
 * __useGetCardsQuery__
 *
 * To run a query within a React component, call `useGetCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetCardsQuery, GetCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCardsQuery, GetCardsQueryVariables>(GetCardsDocument, options);
      }
export function useGetCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCardsQuery, GetCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCardsQuery, GetCardsQueryVariables>(GetCardsDocument, options);
        }
export function useGetCardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCardsQuery, GetCardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCardsQuery, GetCardsQueryVariables>(GetCardsDocument, options);
        }
export type GetCardsQueryHookResult = ReturnType<typeof useGetCardsQuery>;
export type GetCardsLazyQueryHookResult = ReturnType<typeof useGetCardsLazyQuery>;
export type GetCardsSuspenseQueryHookResult = ReturnType<typeof useGetCardsSuspenseQuery>;
export type GetCardsQueryResult = Apollo.QueryResult<GetCardsQuery, GetCardsQueryVariables>;