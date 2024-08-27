import gql from "graphql-tag"
import * as Urql from "urql"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigInt: { input: bigint; output: bigint }
  DateTime: { input: Date; output: Date }
  JSON: { input: Record<string, any>; output: Record<string, any> }
}

export type AccessType = {
  __typename?: "AccessType"
  _count?: Maybe<AccessTypeCount>
  type: Scalars["String"]["output"]
}

export type AccessTypeCount = {
  __typename?: "AccessTypeCount"
  randomWheel: Scalars["Int"]["output"]
}

export type AccessTypeCountRandomWheelArgs = {
  where?: InputMaybe<RandomWheelWhereInput>
}

export type AccessTypeRelationFilter = {
  is?: InputMaybe<AccessTypeWhereInput>
  isNot?: InputMaybe<AccessTypeWhereInput>
}

export type AccessTypeWhereInput = {
  AND?: InputMaybe<Array<AccessTypeWhereInput>>
  NOT?: InputMaybe<Array<AccessTypeWhereInput>>
  OR?: InputMaybe<Array<AccessTypeWhereInput>>
  randomWheel?: InputMaybe<RandomWheelListRelationFilter>
  type?: InputMaybe<StringFilter>
}

export type AppError = {
  __typename?: "AppError"
  errorCode: Scalars["Int"]["output"]
  errorMessage?: Maybe<Scalars["String"]["output"]>
  fieldErrors?: Maybe<Array<FieldError>>
}

export type BigIntFilter = {
  equals?: InputMaybe<Scalars["BigInt"]["input"]>
  gt?: InputMaybe<Scalars["BigInt"]["input"]>
  gte?: InputMaybe<Scalars["BigInt"]["input"]>
  in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>
  lt?: InputMaybe<Scalars["BigInt"]["input"]>
  lte?: InputMaybe<Scalars["BigInt"]["input"]>
  not?: InputMaybe<NestedBigIntFilter>
  notIn?: InputMaybe<Array<Scalars["BigInt"]["input"]>>
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars["Boolean"]["input"]>
  not?: InputMaybe<NestedBoolFilter>
}

export type ColorTheme = {
  __typename?: "ColorTheme"
  _count?: Maybe<ColorThemeCount>
  colors: Array<Scalars["String"]["output"]>
  creatorId?: Maybe<Scalars["String"]["output"]>
  global: Scalars["Boolean"]["output"]
  id: Scalars["String"]["output"]
  name?: Maybe<Scalars["String"]["output"]>
}

export type ColorThemeCount = {
  __typename?: "ColorThemeCount"
  randomWheels: Scalars["Int"]["output"]
  usersStandard: Scalars["Int"]["output"]
}

export type ColorThemeCountRandomWheelsArgs = {
  where?: InputMaybe<RandomWheelWhereInput>
}

export type ColorThemeCountUsersStandardArgs = {
  where?: InputMaybe<UserWhereInput>
}

export type ColorThemeInput = {
  colors?: InputMaybe<Array<Scalars["String"]["input"]>>
  id?: InputMaybe<Scalars["String"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
}

export type ColorThemeListRelationFilter = {
  every?: InputMaybe<ColorThemeWhereInput>
  none?: InputMaybe<ColorThemeWhereInput>
  some?: InputMaybe<ColorThemeWhereInput>
}

export type ColorThemeNullableRelationFilter = {
  is?: InputMaybe<ColorThemeWhereInput>
  isNot?: InputMaybe<ColorThemeWhereInput>
}

export type ColorThemeWhereInput = {
  AND?: InputMaybe<Array<ColorThemeWhereInput>>
  NOT?: InputMaybe<Array<ColorThemeWhereInput>>
  OR?: InputMaybe<Array<ColorThemeWhereInput>>
  colors?: InputMaybe<StringNullableListFilter>
  creator?: InputMaybe<UserNullableRelationFilter>
  creatorId?: InputMaybe<UuidNullableFilter>
  global?: InputMaybe<BoolFilter>
  id?: InputMaybe<UuidFilter>
  name?: InputMaybe<StringNullableFilter>
  randomWheels?: InputMaybe<RandomWheelListRelationFilter>
  usersStandard?: InputMaybe<UserListRelationFilter>
}

export type CustomReward = {
  __typename?: "CustomReward"
  autoFulfill: Scalars["Boolean"]["output"]
  backgroundColor: Scalars["String"]["output"]
  broadcasterDisplayName: Scalars["String"]["output"]
  broadcasterId: Scalars["String"]["output"]
  broadcasterName: Scalars["String"]["output"]
  cooldownExpiryDate?: Maybe<Scalars["DateTime"]["output"]>
  cost: Scalars["Float"]["output"]
  globalCooldown?: Maybe<Scalars["Int"]["output"]>
  id: Scalars["String"]["output"]
  image: Scalars["String"]["output"]
  isEnabled: Scalars["Boolean"]["output"]
  isInStock: Scalars["Boolean"]["output"]
  isPaused: Scalars["Boolean"]["output"]
  maxRedemptionsPerStream?: Maybe<Scalars["Int"]["output"]>
  maxRedemptionsPerUserPerStream?: Maybe<Scalars["Int"]["output"]>
  prompt: Scalars["String"]["output"]
  redemptionsThisStream?: Maybe<Scalars["Int"]["output"]>
  title: Scalars["String"]["output"]
  userInputRequired: Scalars["Boolean"]["output"]
}

export type CustomRewardCreateInput = {
  autoFulfill?: InputMaybe<Scalars["Boolean"]["input"]>
  backgroundColor?: InputMaybe<Scalars["String"]["input"]>
  cost: Scalars["Int"]["input"]
  globalCooldown?: InputMaybe<Scalars["Int"]["input"]>
  isEnabled?: InputMaybe<Scalars["Boolean"]["input"]>
  isPaused?: InputMaybe<Scalars["Boolean"]["input"]>
  maxRedemptionsPerStream?: InputMaybe<Scalars["Int"]["input"]>
  maxRedemptionsPerUserPerStream?: InputMaybe<Scalars["Int"]["input"]>
  prompt?: InputMaybe<Scalars["String"]["input"]>
  title: Scalars["String"]["input"]
  userInputRequired?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomRewardUpdateInput = {
  autoFulfill?: InputMaybe<Scalars["Boolean"]["input"]>
  backgroundColor?: InputMaybe<Scalars["String"]["input"]>
  cost?: InputMaybe<Scalars["Int"]["input"]>
  globalCooldown?: InputMaybe<Scalars["Int"]["input"]>
  isEnabled?: InputMaybe<Scalars["Boolean"]["input"]>
  isPaused?: InputMaybe<Scalars["Boolean"]["input"]>
  maxRedemptionsPerStream?: InputMaybe<Scalars["Int"]["input"]>
  maxRedemptionsPerUserPerStream?: InputMaybe<Scalars["Int"]["input"]>
  prompt?: InputMaybe<Scalars["String"]["input"]>
  title?: InputMaybe<Scalars["String"]["input"]>
  userInputRequired?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars["DateTime"]["input"]>
  gt?: InputMaybe<Scalars["DateTime"]["input"]>
  gte?: InputMaybe<Scalars["DateTime"]["input"]>
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>
  lt?: InputMaybe<Scalars["DateTime"]["input"]>
  lte?: InputMaybe<Scalars["DateTime"]["input"]>
  not?: InputMaybe<NestedDateTimeFilter>
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>
}

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars["DateTime"]["input"]>
  gt?: InputMaybe<Scalars["DateTime"]["input"]>
  gte?: InputMaybe<Scalars["DateTime"]["input"]>
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>
  lt?: InputMaybe<Scalars["DateTime"]["input"]>
  lte?: InputMaybe<Scalars["DateTime"]["input"]>
  not?: InputMaybe<NestedDateTimeNullableFilter>
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>
}

export type EventSubscriptionListRelationFilter = {
  every?: InputMaybe<EventSubscriptionWhereInput>
  none?: InputMaybe<EventSubscriptionWhereInput>
  some?: InputMaybe<EventSubscriptionWhereInput>
}

export type EventSubscriptionNullableRelationFilter = {
  is?: InputMaybe<EventSubscriptionWhereInput>
  isNot?: InputMaybe<EventSubscriptionWhereInput>
}

export type EventSubscriptionWhereInput = {
  AND?: InputMaybe<Array<EventSubscriptionWhereInput>>
  NOT?: InputMaybe<Array<EventSubscriptionWhereInput>>
  OR?: InputMaybe<Array<EventSubscriptionWhereInput>>
  condition?: InputMaybe<JsonNullableFilter>
  id?: InputMaybe<UuidFilter>
  itemId?: InputMaybe<StringNullableFilter>
  paused?: InputMaybe<BoolFilter>
  subscriptionId?: InputMaybe<StringNullableFilter>
  subscriptionType?: InputMaybe<StringFilter>
  twitchUserId?: InputMaybe<StringFilter>
  type?: InputMaybe<StringFilter>
  user?: InputMaybe<UserNullableRelationFilter>
  userId?: InputMaybe<UuidNullableFilter>
  wheelSync?: InputMaybe<RandomWheelSyncListRelationFilter>
}

export type FieldError = {
  __typename?: "FieldError"
  field: Scalars["String"]["output"]
  message: Scalars["String"]["output"]
}

export type FloatFilter = {
  equals?: InputMaybe<Scalars["Float"]["input"]>
  gt?: InputMaybe<Scalars["Float"]["input"]>
  gte?: InputMaybe<Scalars["Float"]["input"]>
  in?: InputMaybe<Array<Scalars["Float"]["input"]>>
  lt?: InputMaybe<Scalars["Float"]["input"]>
  lte?: InputMaybe<Scalars["Float"]["input"]>
  not?: InputMaybe<NestedFloatFilter>
  notIn?: InputMaybe<Array<Scalars["Float"]["input"]>>
}

export type IntFilter = {
  equals?: InputMaybe<Scalars["Int"]["input"]>
  gt?: InputMaybe<Scalars["Int"]["input"]>
  gte?: InputMaybe<Scalars["Int"]["input"]>
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>
  lt?: InputMaybe<Scalars["Int"]["input"]>
  lte?: InputMaybe<Scalars["Int"]["input"]>
  not?: InputMaybe<NestedIntFilter>
  notIn?: InputMaybe<Array<Scalars["Int"]["input"]>>
}

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars["Int"]["input"]>
  gt?: InputMaybe<Scalars["Int"]["input"]>
  gte?: InputMaybe<Scalars["Int"]["input"]>
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>
  lt?: InputMaybe<Scalars["Int"]["input"]>
  lte?: InputMaybe<Scalars["Int"]["input"]>
  not?: InputMaybe<NestedIntNullableFilter>
  notIn?: InputMaybe<Array<Scalars["Int"]["input"]>>
}

export type JsonNullableFilter = {
  array_contains?: InputMaybe<Scalars["JSON"]["input"]>
  array_ends_with?: InputMaybe<Scalars["JSON"]["input"]>
  array_starts_with?: InputMaybe<Scalars["JSON"]["input"]>
  equals?: InputMaybe<Scalars["JSON"]["input"]>
  gt?: InputMaybe<Scalars["JSON"]["input"]>
  gte?: InputMaybe<Scalars["JSON"]["input"]>
  lt?: InputMaybe<Scalars["JSON"]["input"]>
  lte?: InputMaybe<Scalars["JSON"]["input"]>
  not?: InputMaybe<Scalars["JSON"]["input"]>
  path?: InputMaybe<Array<Scalars["String"]["input"]>>
  string_contains?: InputMaybe<Scalars["String"]["input"]>
  string_ends_with?: InputMaybe<Scalars["String"]["input"]>
  string_starts_with?: InputMaybe<Scalars["String"]["input"]>
}

export type Mutation = {
  __typename?: "Mutation"
  addRandomWheelEntry: RandomWheelEntry
  addRewardGroupItem?: Maybe<RewardGroupItem>
  addWheelSync?: Maybe<RandomWheelSync>
  clearRandomWheel: Scalars["Int"]["output"]
  createChannelReward?: Maybe<CustomReward>
  createRandomWheel: RandomWheel
  createRewardGroup?: Maybe<RewardGroup>
  createRewardLink?: Maybe<RewardLink>
  deleteChannelReward: Scalars["Boolean"]["output"]
  deleteRandomWheel?: Maybe<AppError>
  deleteRandomWheelEntry?: Maybe<Scalars["Boolean"]["output"]>
  deleteRandomWheelMember?: Maybe<Scalars["Boolean"]["output"]>
  deleteRewardGroup?: Maybe<Scalars["Boolean"]["output"]>
  deleteRewardGroupItem?: Maybe<Scalars["Boolean"]["output"]>
  deleteRewardLink: Scalars["Boolean"]["output"]
  deleteWheelSync?: Maybe<Scalars["Boolean"]["output"]>
  disconnectAccessToken: Scalars["Boolean"]["output"]
  likeRandomWheel?: Maybe<RandomWheelLike>
  login: UserResponse
  logout: Scalars["Boolean"]["output"]
  pauseWheelSync?: Maybe<RandomWheelSync>
  register: UserResponse
  resetShareToken?: Maybe<Scalars["Boolean"]["output"]>
  spinRandomWheel: RandomWheelWinner
  updateChannelReward?: Maybe<CustomReward>
  updateRandomWheel?: Maybe<RandomWheel>
  updateRandomWheelEntry: RandomWheelEntry
  updateRandomWheelMembers?: Maybe<Array<RandomWheelMember>>
  updateRewardGroup?: Maybe<RewardGroup>
  updateRewardGroupItem?: Maybe<RewardGroupItem>
  updateRewardToken: CustomReward
  updateUser: UserResponse
  usernameExists: Scalars["Boolean"]["output"]
}

export type MutationAddRandomWheelEntryArgs = {
  color?: InputMaybe<Scalars["String"]["input"]>
  name: Scalars["String"]["input"]
  randomWheelId: Scalars["String"]["input"]
  weight?: InputMaybe<Scalars["Float"]["input"]>
}

export type MutationAddRewardGroupItemArgs = {
  rewardGroupId: Scalars["String"]["input"]
  rewardId: Scalars["String"]["input"]
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationAddWheelSyncArgs = {
  addExisting?: InputMaybe<Scalars["Boolean"]["input"]>
  randomWheelId: Scalars["String"]["input"]
  rewardId: Scalars["String"]["input"]
  useInput?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationClearRandomWheelArgs = {
  id: Scalars["String"]["input"]
}

export type MutationCreateChannelRewardArgs = {
  reward: CustomRewardCreateInput
}

export type MutationCreateRandomWheelArgs = {
  accessType?: InputMaybe<Scalars["String"]["input"]>
  editAnonymous?: InputMaybe<Scalars["Boolean"]["input"]>
  fadeDuration?: InputMaybe<Scalars["Int"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
  spinDuration?: InputMaybe<Scalars["Int"]["input"]>
  uniqueEntries?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationCreateRewardGroupArgs = {
  items: Array<RewardGroupItemInput>
  rewardGroup: RewardGroupInput
}

export type MutationCreateRewardLinkArgs = {
  rewardId: Scalars["String"]["input"]
  type: Scalars["String"]["input"]
}

export type MutationDeleteChannelRewardArgs = {
  rewardId: Scalars["String"]["input"]
}

export type MutationDeleteRandomWheelArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRandomWheelEntryArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRandomWheelMemberArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRewardGroupArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRewardGroupItemArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRewardLinkArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteWheelSyncArgs = {
  ids: Array<Scalars["String"]["input"]>
}

export type MutationLikeRandomWheelArgs = {
  like: Scalars["Boolean"]["input"]
  randomWheelId: Scalars["String"]["input"]
}

export type MutationLoginArgs = {
  password: Scalars["String"]["input"]
  username: Scalars["String"]["input"]
}

export type MutationPauseWheelSyncArgs = {
  id: Scalars["String"]["input"]
  paused: Scalars["Boolean"]["input"]
}

export type MutationRegisterArgs = {
  displayname?: InputMaybe<Scalars["String"]["input"]>
  password: Scalars["String"]["input"]
  username: Scalars["String"]["input"]
}

export type MutationResetShareTokenArgs = {
  randommWheelId: Scalars["String"]["input"]
}

export type MutationSpinRandomWheelArgs = {
  randommWheelId: Scalars["String"]["input"]
}

export type MutationUpdateChannelRewardArgs = {
  reward: CustomRewardUpdateInput
  rewardId: Scalars["String"]["input"]
}

export type MutationUpdateRandomWheelArgs = {
  id: Scalars["String"]["input"]
  options: RandomWheelInput
}

export type MutationUpdateRandomWheelEntryArgs = {
  entry: RandomWheelEntryInput
  id: Scalars["String"]["input"]
}

export type MutationUpdateRandomWheelMembersArgs = {
  members: Array<RandomWheelMemberInput>
  randomWheelId: Scalars["String"]["input"]
}

export type MutationUpdateRewardGroupArgs = {
  id: Scalars["String"]["input"]
  items?: InputMaybe<Array<RewardGroupItemInput>>
  rewardGroup?: InputMaybe<RewardGroupInput>
}

export type MutationUpdateRewardGroupItemArgs = {
  id: Scalars["String"]["input"]
  rewardEnabled?: InputMaybe<Scalars["Boolean"]["input"]>
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationUpdateRewardTokenArgs = {
  token: Scalars["String"]["input"]
  type: Scalars["String"]["input"]
}

export type MutationUpdateUserArgs = {
  user: UserInput
}

export type MutationUsernameExistsArgs = {
  username: Scalars["String"]["input"]
}

export type NestedBigIntFilter = {
  equals?: InputMaybe<Scalars["BigInt"]["input"]>
  gt?: InputMaybe<Scalars["BigInt"]["input"]>
  gte?: InputMaybe<Scalars["BigInt"]["input"]>
  in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>
  lt?: InputMaybe<Scalars["BigInt"]["input"]>
  lte?: InputMaybe<Scalars["BigInt"]["input"]>
  not?: InputMaybe<NestedBigIntFilter>
  notIn?: InputMaybe<Array<Scalars["BigInt"]["input"]>>
}

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars["Boolean"]["input"]>
  not?: InputMaybe<NestedBoolFilter>
}

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars["DateTime"]["input"]>
  gt?: InputMaybe<Scalars["DateTime"]["input"]>
  gte?: InputMaybe<Scalars["DateTime"]["input"]>
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>
  lt?: InputMaybe<Scalars["DateTime"]["input"]>
  lte?: InputMaybe<Scalars["DateTime"]["input"]>
  not?: InputMaybe<NestedDateTimeFilter>
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>
}

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars["DateTime"]["input"]>
  gt?: InputMaybe<Scalars["DateTime"]["input"]>
  gte?: InputMaybe<Scalars["DateTime"]["input"]>
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>
  lt?: InputMaybe<Scalars["DateTime"]["input"]>
  lte?: InputMaybe<Scalars["DateTime"]["input"]>
  not?: InputMaybe<NestedDateTimeNullableFilter>
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>
}

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars["Float"]["input"]>
  gt?: InputMaybe<Scalars["Float"]["input"]>
  gte?: InputMaybe<Scalars["Float"]["input"]>
  in?: InputMaybe<Array<Scalars["Float"]["input"]>>
  lt?: InputMaybe<Scalars["Float"]["input"]>
  lte?: InputMaybe<Scalars["Float"]["input"]>
  not?: InputMaybe<NestedFloatFilter>
  notIn?: InputMaybe<Array<Scalars["Float"]["input"]>>
}

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars["Int"]["input"]>
  gt?: InputMaybe<Scalars["Int"]["input"]>
  gte?: InputMaybe<Scalars["Int"]["input"]>
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>
  lt?: InputMaybe<Scalars["Int"]["input"]>
  lte?: InputMaybe<Scalars["Int"]["input"]>
  not?: InputMaybe<NestedIntFilter>
  notIn?: InputMaybe<Array<Scalars["Int"]["input"]>>
}

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars["Int"]["input"]>
  gt?: InputMaybe<Scalars["Int"]["input"]>
  gte?: InputMaybe<Scalars["Int"]["input"]>
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>
  lt?: InputMaybe<Scalars["Int"]["input"]>
  lte?: InputMaybe<Scalars["Int"]["input"]>
  not?: InputMaybe<NestedIntNullableFilter>
  notIn?: InputMaybe<Array<Scalars["Int"]["input"]>>
}

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>
  endsWith?: InputMaybe<Scalars["String"]["input"]>
  equals?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  in?: InputMaybe<Array<Scalars["String"]["input"]>>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  not?: InputMaybe<NestedStringFilter>
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>
  startsWith?: InputMaybe<Scalars["String"]["input"]>
}

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>
  endsWith?: InputMaybe<Scalars["String"]["input"]>
  equals?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  in?: InputMaybe<Array<Scalars["String"]["input"]>>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  not?: InputMaybe<NestedStringNullableFilter>
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>
  startsWith?: InputMaybe<Scalars["String"]["input"]>
}

export type NestedUuidFilter = {
  equals?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  in?: InputMaybe<Array<Scalars["String"]["input"]>>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  not?: InputMaybe<NestedUuidFilter>
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type NestedUuidNullableFilter = {
  equals?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  in?: InputMaybe<Array<Scalars["String"]["input"]>>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  not?: InputMaybe<NestedUuidNullableFilter>
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type Query = {
  __typename?: "Query"
  channelRewards: Array<CustomReward>
  colorThemes: Array<ColorTheme>
  me?: Maybe<User>
  myRandomWheels: Array<RandomWheel>
  randomWheelBySlug?: Maybe<RandomWheel>
  rewardByToken: CustomReward
  rewardGroup: RewardGroup
  rewardGroups: Array<RewardGroup>
  rewardLinks: Array<RewardLink>
  syncForWheel: Array<RandomWheelSync>
  userAccesToken?: Maybe<UserAccessToken>
}

export type QueryChannelRewardsArgs = {
  onlyManageable?: InputMaybe<Scalars["Boolean"]["input"]>
  userId?: InputMaybe<Scalars["String"]["input"]>
}

export type QueryColorThemesArgs = {
  type?: InputMaybe<Scalars["String"]["input"]>
}

export type QueryMyRandomWheelsArgs = {
  type?: InputMaybe<Scalars["String"]["input"]>
}

export type QueryRandomWheelBySlugArgs = {
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}

export type QueryRewardByTokenArgs = {
  token: Scalars["String"]["input"]
  type: Scalars["String"]["input"]
}

export type QueryRewardGroupArgs = {
  id: Scalars["String"]["input"]
}

export type QueryRewardGroupsArgs = {
  items?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRewardLinksArgs = {
  rewardIds?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type QuerySyncForWheelArgs = {
  randomWheelId: Scalars["String"]["input"]
}

export enum QueryMode {
  Default = "default",
  Insensitive = "insensitive",
}

export type RandomWheel = {
  __typename?: "RandomWheel"
  _count?: Maybe<RandomWheelCount>
  access: AccessType
  accessType: Scalars["String"]["output"]
  createdAt: Scalars["DateTime"]["output"]
  editAnonymous: Scalars["Boolean"]["output"]
  editable: Scalars["Boolean"]["output"]
  entries: Array<RandomWheelEntry>
  fadeDuration: Scalars["Int"]["output"]
  id: Scalars["String"]["output"]
  liked: Scalars["Boolean"]["output"]
  members: Array<RandomWheelMember>
  name?: Maybe<Scalars["String"]["output"]>
  owner?: Maybe<User>
  ownerId?: Maybe<Scalars["String"]["output"]>
  rotation: Scalars["Float"]["output"]
  shareToken?: Maybe<Scalars["String"]["output"]>
  slug: Scalars["String"]["output"]
  spinDuration: Scalars["Int"]["output"]
  theme?: Maybe<ColorTheme>
  themeId?: Maybe<Scalars["String"]["output"]>
  uniqueEntries: Scalars["Boolean"]["output"]
  winners: Array<RandomWheelWinner>
}

export type RandomWheelCount = {
  __typename?: "RandomWheelCount"
  entries: Scalars["Int"]["output"]
  likes: Scalars["Int"]["output"]
  members: Scalars["Int"]["output"]
  wheelSync: Scalars["Int"]["output"]
  winners: Scalars["Int"]["output"]
}

export type RandomWheelCountEntriesArgs = {
  where?: InputMaybe<RandomWheelEntryWhereInput>
}

export type RandomWheelCountLikesArgs = {
  where?: InputMaybe<RandomWheelLikeWhereInput>
}

export type RandomWheelCountMembersArgs = {
  where?: InputMaybe<RandomWheelMemberWhereInput>
}

export type RandomWheelCountWheelSyncArgs = {
  where?: InputMaybe<RandomWheelSyncWhereInput>
}

export type RandomWheelCountWinnersArgs = {
  where?: InputMaybe<RandomWheelWinnerWhereInput>
}

export type RandomWheelEntry = {
  __typename?: "RandomWheelEntry"
  color?: Maybe<Scalars["String"]["output"]>
  createdAt: Scalars["DateTime"]["output"]
  id: Scalars["String"]["output"]
  name: Scalars["String"]["output"]
  randomWheelId: Scalars["String"]["output"]
  redemptionId?: Maybe<Scalars["String"]["output"]>
  weight: Scalars["Int"]["output"]
}

export type RandomWheelEntryInput = {
  color?: InputMaybe<Scalars["String"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
  weight?: InputMaybe<Scalars["Int"]["input"]>
}

export type RandomWheelEntryListRelationFilter = {
  every?: InputMaybe<RandomWheelEntryWhereInput>
  none?: InputMaybe<RandomWheelEntryWhereInput>
  some?: InputMaybe<RandomWheelEntryWhereInput>
}

export type RandomWheelEntryWhereInput = {
  AND?: InputMaybe<Array<RandomWheelEntryWhereInput>>
  NOT?: InputMaybe<Array<RandomWheelEntryWhereInput>>
  OR?: InputMaybe<Array<RandomWheelEntryWhereInput>>
  color?: InputMaybe<StringNullableFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<UuidFilter>
  name?: InputMaybe<StringFilter>
  randomWheel?: InputMaybe<RandomWheelRelationFilter>
  randomWheelId?: InputMaybe<UuidFilter>
  redemptionId?: InputMaybe<StringNullableFilter>
  weight?: InputMaybe<IntFilter>
}

export type RandomWheelInput = {
  accessType?: InputMaybe<Scalars["String"]["input"]>
  editAnonymous?: InputMaybe<Scalars["Boolean"]["input"]>
  fadeDuration?: InputMaybe<Scalars["Int"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
  spinDuration?: InputMaybe<Scalars["Int"]["input"]>
  theme?: InputMaybe<ColorThemeInput>
  uniqueEntries?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type RandomWheelLike = {
  __typename?: "RandomWheelLike"
  createdAt: Scalars["DateTime"]["output"]
  id: Scalars["String"]["output"]
  randomWheelId: Scalars["String"]["output"]
  userId: Scalars["String"]["output"]
}

export type RandomWheelLikeListRelationFilter = {
  every?: InputMaybe<RandomWheelLikeWhereInput>
  none?: InputMaybe<RandomWheelLikeWhereInput>
  some?: InputMaybe<RandomWheelLikeWhereInput>
}

export type RandomWheelLikeWhereInput = {
  AND?: InputMaybe<Array<RandomWheelLikeWhereInput>>
  NOT?: InputMaybe<Array<RandomWheelLikeWhereInput>>
  OR?: InputMaybe<Array<RandomWheelLikeWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<UuidFilter>
  randomWheel?: InputMaybe<RandomWheelRelationFilter>
  randomWheelId?: InputMaybe<UuidFilter>
  user?: InputMaybe<UserRelationFilter>
  userId?: InputMaybe<UuidFilter>
}

export type RandomWheelListRelationFilter = {
  every?: InputMaybe<RandomWheelWhereInput>
  none?: InputMaybe<RandomWheelWhereInput>
  some?: InputMaybe<RandomWheelWhereInput>
}

export type RandomWheelMember = {
  __typename?: "RandomWheelMember"
  id: Scalars["String"]["output"]
  randomWheelId: Scalars["String"]["output"]
  role: RandomWheelRole
  roleName: Scalars["String"]["output"]
  user: User
  userId: Scalars["String"]["output"]
}

export type RandomWheelMemberInput = {
  delete?: InputMaybe<Scalars["Boolean"]["input"]>
  id?: InputMaybe<Scalars["String"]["input"]>
  role: Scalars["String"]["input"]
  username: Scalars["String"]["input"]
}

export type RandomWheelMemberListRelationFilter = {
  every?: InputMaybe<RandomWheelMemberWhereInput>
  none?: InputMaybe<RandomWheelMemberWhereInput>
  some?: InputMaybe<RandomWheelMemberWhereInput>
}

export type RandomWheelMemberWhereInput = {
  AND?: InputMaybe<Array<RandomWheelMemberWhereInput>>
  NOT?: InputMaybe<Array<RandomWheelMemberWhereInput>>
  OR?: InputMaybe<Array<RandomWheelMemberWhereInput>>
  id?: InputMaybe<UuidFilter>
  randomWheel?: InputMaybe<RandomWheelRelationFilter>
  randomWheelId?: InputMaybe<UuidFilter>
  role?: InputMaybe<RandomWheelRoleRelationFilter>
  roleName?: InputMaybe<StringFilter>
  user?: InputMaybe<UserRelationFilter>
  userId?: InputMaybe<UuidFilter>
}

export type RandomWheelRelationFilter = {
  is?: InputMaybe<RandomWheelWhereInput>
  isNot?: InputMaybe<RandomWheelWhereInput>
}

export type RandomWheelRole = {
  __typename?: "RandomWheelRole"
  _count?: Maybe<RandomWheelRoleCount>
  description?: Maybe<Scalars["String"]["output"]>
  name: Scalars["String"]["output"]
}

export type RandomWheelRoleCount = {
  __typename?: "RandomWheelRoleCount"
  members: Scalars["Int"]["output"]
}

export type RandomWheelRoleCountMembersArgs = {
  where?: InputMaybe<RandomWheelMemberWhereInput>
}

export type RandomWheelRoleRelationFilter = {
  is?: InputMaybe<RandomWheelRoleWhereInput>
  isNot?: InputMaybe<RandomWheelRoleWhereInput>
}

export type RandomWheelRoleWhereInput = {
  AND?: InputMaybe<Array<RandomWheelRoleWhereInput>>
  NOT?: InputMaybe<Array<RandomWheelRoleWhereInput>>
  OR?: InputMaybe<Array<RandomWheelRoleWhereInput>>
  description?: InputMaybe<StringNullableFilter>
  members?: InputMaybe<RandomWheelMemberListRelationFilter>
  name?: InputMaybe<StringFilter>
}

export type RandomWheelSync = {
  __typename?: "RandomWheelSync"
  createdAt: Scalars["DateTime"]["output"]
  eventSubscriptionId?: Maybe<Scalars["String"]["output"]>
  id: Scalars["String"]["output"]
  paused: Scalars["Boolean"]["output"]
  pending: Scalars["Boolean"]["output"]
  randomWheelId: Scalars["String"]["output"]
  reward?: Maybe<CustomReward>
  rewardId: Scalars["String"]["output"]
  useInput: Scalars["Boolean"]["output"]
}

export type RandomWheelSyncListRelationFilter = {
  every?: InputMaybe<RandomWheelSyncWhereInput>
  none?: InputMaybe<RandomWheelSyncWhereInput>
  some?: InputMaybe<RandomWheelSyncWhereInput>
}

export type RandomWheelSyncWhereInput = {
  AND?: InputMaybe<Array<RandomWheelSyncWhereInput>>
  NOT?: InputMaybe<Array<RandomWheelSyncWhereInput>>
  OR?: InputMaybe<Array<RandomWheelSyncWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  eventSubscription?: InputMaybe<EventSubscriptionNullableRelationFilter>
  eventSubscriptionId?: InputMaybe<UuidNullableFilter>
  id?: InputMaybe<UuidFilter>
  paused?: InputMaybe<BoolFilter>
  randomWheel?: InputMaybe<RandomWheelRelationFilter>
  randomWheelId?: InputMaybe<UuidFilter>
  rewardId?: InputMaybe<StringFilter>
  useInput?: InputMaybe<BoolFilter>
}

export type RandomWheelWhereInput = {
  AND?: InputMaybe<Array<RandomWheelWhereInput>>
  NOT?: InputMaybe<Array<RandomWheelWhereInput>>
  OR?: InputMaybe<Array<RandomWheelWhereInput>>
  access?: InputMaybe<AccessTypeRelationFilter>
  accessType?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  editAnonymous?: InputMaybe<BoolFilter>
  entries?: InputMaybe<RandomWheelEntryListRelationFilter>
  fadeDuration?: InputMaybe<IntFilter>
  id?: InputMaybe<UuidFilter>
  likes?: InputMaybe<RandomWheelLikeListRelationFilter>
  members?: InputMaybe<RandomWheelMemberListRelationFilter>
  name?: InputMaybe<StringNullableFilter>
  owner?: InputMaybe<UserNullableRelationFilter>
  ownerId?: InputMaybe<UuidNullableFilter>
  rotation?: InputMaybe<FloatFilter>
  shareToken?: InputMaybe<StringNullableFilter>
  slug?: InputMaybe<StringFilter>
  spinDuration?: InputMaybe<IntFilter>
  theme?: InputMaybe<ColorThemeNullableRelationFilter>
  themeId?: InputMaybe<UuidNullableFilter>
  uniqueEntries?: InputMaybe<BoolFilter>
  wheelSync?: InputMaybe<RandomWheelSyncListRelationFilter>
  winners?: InputMaybe<RandomWheelWinnerListRelationFilter>
}

export type RandomWheelWinner = {
  __typename?: "RandomWheelWinner"
  createdAt: Scalars["DateTime"]["output"]
  drawnById?: Maybe<Scalars["String"]["output"]>
  id: Scalars["String"]["output"]
  name: Scalars["String"]["output"]
  randomWheelId: Scalars["String"]["output"]
  winnerIndex?: Maybe<Scalars["Int"]["output"]>
}

export type RandomWheelWinnerListRelationFilter = {
  every?: InputMaybe<RandomWheelWinnerWhereInput>
  none?: InputMaybe<RandomWheelWinnerWhereInput>
  some?: InputMaybe<RandomWheelWinnerWhereInput>
}

export type RandomWheelWinnerWhereInput = {
  AND?: InputMaybe<Array<RandomWheelWinnerWhereInput>>
  NOT?: InputMaybe<Array<RandomWheelWinnerWhereInput>>
  OR?: InputMaybe<Array<RandomWheelWinnerWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  drawnBy?: InputMaybe<UserNullableRelationFilter>
  drawnById?: InputMaybe<UuidNullableFilter>
  id?: InputMaybe<UuidFilter>
  name?: InputMaybe<StringFilter>
  randomWheel?: InputMaybe<RandomWheelRelationFilter>
  randomWheelId?: InputMaybe<UuidFilter>
  winnerIndex?: InputMaybe<IntNullableFilter>
}

export type RewardGroup = {
  __typename?: "RewardGroup"
  _count?: Maybe<RewardGroupCount>
  active: Scalars["Boolean"]["output"]
  cooldownExpiry?: Maybe<Scalars["DateTime"]["output"]>
  id: Scalars["String"]["output"]
  items?: Maybe<Array<RewardGroupItem>>
  name?: Maybe<Scalars["String"]["output"]>
  triggerSelected: Scalars["Boolean"]["output"]
  userId: Scalars["String"]["output"]
}

export type RewardGroupCount = {
  __typename?: "RewardGroupCount"
  items: Scalars["Int"]["output"]
}

export type RewardGroupCountItemsArgs = {
  where?: InputMaybe<RewardGroupItemWhereInput>
}

export type RewardGroupInput = {
  active?: InputMaybe<Scalars["Boolean"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
  triggerSelected?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type RewardGroupItem = {
  __typename?: "RewardGroupItem"
  id: Scalars["String"]["output"]
  rewardEnabled: Scalars["Boolean"]["output"]
  rewardGroupId: Scalars["String"]["output"]
  rewardId: Scalars["String"]["output"]
  triggerCooldown: Scalars["Boolean"]["output"]
}

export type RewardGroupItemInput = {
  rewardId: Scalars["String"]["input"]
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type RewardGroupItemListRelationFilter = {
  every?: InputMaybe<RewardGroupItemWhereInput>
  none?: InputMaybe<RewardGroupItemWhereInput>
  some?: InputMaybe<RewardGroupItemWhereInput>
}

export type RewardGroupItemWhereInput = {
  AND?: InputMaybe<Array<RewardGroupItemWhereInput>>
  NOT?: InputMaybe<Array<RewardGroupItemWhereInput>>
  OR?: InputMaybe<Array<RewardGroupItemWhereInput>>
  id?: InputMaybe<UuidFilter>
  rewardEnabled?: InputMaybe<BoolFilter>
  rewardGroup?: InputMaybe<RewardGroupRelationFilter>
  rewardGroupId?: InputMaybe<UuidFilter>
  rewardId?: InputMaybe<StringFilter>
  triggerCooldown?: InputMaybe<BoolFilter>
}

export type RewardGroupListRelationFilter = {
  every?: InputMaybe<RewardGroupWhereInput>
  none?: InputMaybe<RewardGroupWhereInput>
  some?: InputMaybe<RewardGroupWhereInput>
}

export type RewardGroupRelationFilter = {
  is?: InputMaybe<RewardGroupWhereInput>
  isNot?: InputMaybe<RewardGroupWhereInput>
}

export type RewardGroupWhereInput = {
  AND?: InputMaybe<Array<RewardGroupWhereInput>>
  NOT?: InputMaybe<Array<RewardGroupWhereInput>>
  OR?: InputMaybe<Array<RewardGroupWhereInput>>
  active?: InputMaybe<BoolFilter>
  cooldownExpiry?: InputMaybe<DateTimeNullableFilter>
  id?: InputMaybe<UuidFilter>
  items?: InputMaybe<RewardGroupItemListRelationFilter>
  name?: InputMaybe<StringNullableFilter>
  triggerSelected?: InputMaybe<BoolFilter>
  user?: InputMaybe<UserRelationFilter>
  userId?: InputMaybe<UuidFilter>
}

export type RewardLink = {
  __typename?: "RewardLink"
  id: Scalars["String"]["output"]
  rewardId: Scalars["String"]["output"]
  token: Scalars["String"]["output"]
  type: Scalars["String"]["output"]
  userId: Scalars["String"]["output"]
}

export type RewardLinkListRelationFilter = {
  every?: InputMaybe<RewardLinkWhereInput>
  none?: InputMaybe<RewardLinkWhereInput>
  some?: InputMaybe<RewardLinkWhereInput>
}

export type RewardLinkWhereInput = {
  AND?: InputMaybe<Array<RewardLinkWhereInput>>
  NOT?: InputMaybe<Array<RewardLinkWhereInput>>
  OR?: InputMaybe<Array<RewardLinkWhereInput>>
  id?: InputMaybe<UuidFilter>
  rewardId?: InputMaybe<StringFilter>
  token?: InputMaybe<StringFilter>
  type?: InputMaybe<StringFilter>
  user?: InputMaybe<UserRelationFilter>
  userId?: InputMaybe<UuidFilter>
}

export type StringFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>
  endsWith?: InputMaybe<Scalars["String"]["input"]>
  equals?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  in?: InputMaybe<Array<Scalars["String"]["input"]>>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedStringFilter>
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>
  startsWith?: InputMaybe<Scalars["String"]["input"]>
}

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>
  endsWith?: InputMaybe<Scalars["String"]["input"]>
  equals?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  in?: InputMaybe<Array<Scalars["String"]["input"]>>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedStringNullableFilter>
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>
  startsWith?: InputMaybe<Scalars["String"]["input"]>
}

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars["String"]["input"]>>
  has?: InputMaybe<Scalars["String"]["input"]>
  hasEvery?: InputMaybe<Array<Scalars["String"]["input"]>>
  hasSome?: InputMaybe<Array<Scalars["String"]["input"]>>
  isEmpty?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type User = {
  __typename?: "User"
  _count?: Maybe<UserCount>
  createdAt: Scalars["DateTime"]["output"]
  displayname?: Maybe<Scalars["String"]["output"]>
  id: Scalars["String"]["output"]
  standardThemeId?: Maybe<Scalars["String"]["output"]>
  updatedAt: Scalars["DateTime"]["output"]
  username: Scalars["String"]["output"]
}

export type UserAccessToken = {
  __typename?: "UserAccessToken"
  expiresIn: Scalars["Int"]["output"]
  id: Scalars["String"]["output"]
  obtainmentTimestamp: Scalars["BigInt"]["output"]
  scope: Array<Scalars["String"]["output"]>
  twitchUserId?: Maybe<Scalars["String"]["output"]>
  twitchUsername?: Maybe<Scalars["String"]["output"]>
  userId: Scalars["String"]["output"]
}

export type UserAccessTokenListRelationFilter = {
  every?: InputMaybe<UserAccessTokenWhereInput>
  none?: InputMaybe<UserAccessTokenWhereInput>
  some?: InputMaybe<UserAccessTokenWhereInput>
}

export type UserAccessTokenWhereInput = {
  AND?: InputMaybe<Array<UserAccessTokenWhereInput>>
  NOT?: InputMaybe<Array<UserAccessTokenWhereInput>>
  OR?: InputMaybe<Array<UserAccessTokenWhereInput>>
  accessToken?: InputMaybe<StringFilter>
  expiresIn?: InputMaybe<IntFilter>
  id?: InputMaybe<UuidFilter>
  obtainmentTimestamp?: InputMaybe<BigIntFilter>
  refreshToken?: InputMaybe<StringNullableFilter>
  scope?: InputMaybe<StringNullableListFilter>
  twitchUserId?: InputMaybe<StringNullableFilter>
  twitchUsername?: InputMaybe<StringNullableFilter>
  user?: InputMaybe<UserRelationFilter>
  userId?: InputMaybe<UuidFilter>
}

export type UserCount = {
  __typename?: "UserCount"
  colorThemes: Scalars["Int"]["output"]
  drawnWinners: Scalars["Int"]["output"]
  eventSubscriptions: Scalars["Int"]["output"]
  likes: Scalars["Int"]["output"]
  randomWheelMember: Scalars["Int"]["output"]
  randomWheels: Scalars["Int"]["output"]
  rewardGroups: Scalars["Int"]["output"]
  rewardLinks: Scalars["Int"]["output"]
  userAccessTokens: Scalars["Int"]["output"]
}

export type UserCountColorThemesArgs = {
  where?: InputMaybe<ColorThemeWhereInput>
}

export type UserCountDrawnWinnersArgs = {
  where?: InputMaybe<RandomWheelWinnerWhereInput>
}

export type UserCountEventSubscriptionsArgs = {
  where?: InputMaybe<EventSubscriptionWhereInput>
}

export type UserCountLikesArgs = {
  where?: InputMaybe<RandomWheelLikeWhereInput>
}

export type UserCountRandomWheelMemberArgs = {
  where?: InputMaybe<RandomWheelMemberWhereInput>
}

export type UserCountRandomWheelsArgs = {
  where?: InputMaybe<RandomWheelWhereInput>
}

export type UserCountRewardGroupsArgs = {
  where?: InputMaybe<RewardGroupWhereInput>
}

export type UserCountRewardLinksArgs = {
  where?: InputMaybe<RewardLinkWhereInput>
}

export type UserCountUserAccessTokensArgs = {
  where?: InputMaybe<UserAccessTokenWhereInput>
}

export type UserInput = {
  displayname?: InputMaybe<Scalars["String"]["input"]>
  username?: InputMaybe<Scalars["String"]["input"]>
}

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>
  none?: InputMaybe<UserWhereInput>
  some?: InputMaybe<UserWhereInput>
}

export type UserNullableRelationFilter = {
  is?: InputMaybe<UserWhereInput>
  isNot?: InputMaybe<UserWhereInput>
}

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>
  isNot?: InputMaybe<UserWhereInput>
}

export type UserResponse = {
  __typename?: "UserResponse"
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>
  NOT?: InputMaybe<Array<UserWhereInput>>
  OR?: InputMaybe<Array<UserWhereInput>>
  colorThemes?: InputMaybe<ColorThemeListRelationFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  displayname?: InputMaybe<StringNullableFilter>
  drawnWinners?: InputMaybe<RandomWheelWinnerListRelationFilter>
  eventSubscriptions?: InputMaybe<EventSubscriptionListRelationFilter>
  id?: InputMaybe<UuidFilter>
  likes?: InputMaybe<RandomWheelLikeListRelationFilter>
  password?: InputMaybe<StringFilter>
  randomWheelMember?: InputMaybe<RandomWheelMemberListRelationFilter>
  randomWheels?: InputMaybe<RandomWheelListRelationFilter>
  rewardGroups?: InputMaybe<RewardGroupListRelationFilter>
  rewardLinks?: InputMaybe<RewardLinkListRelationFilter>
  standardTheme?: InputMaybe<ColorThemeNullableRelationFilter>
  standardThemeId?: InputMaybe<UuidNullableFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  userAccessTokens?: InputMaybe<UserAccessTokenListRelationFilter>
  username?: InputMaybe<StringFilter>
}

export type UuidFilter = {
  equals?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  in?: InputMaybe<Array<Scalars["String"]["input"]>>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedUuidFilter>
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type UuidNullableFilter = {
  equals?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  in?: InputMaybe<Array<Scalars["String"]["input"]>>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedUuidNullableFilter>
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type ColorThemeFragment = {
  __typename?: "ColorTheme"
  id: string
  name?: string | null
  colors: Array<string>
  creatorId?: string | null
  global: boolean
}

export type CustomRewardFragment = {
  __typename?: "CustomReward"
  id: string
  broadcasterId: string
  broadcasterName: string
  broadcasterDisplayName: string
  backgroundColor: string
  isEnabled: boolean
  cost: number
  title: string
  prompt: string
  userInputRequired: boolean
  maxRedemptionsPerStream?: number | null
  maxRedemptionsPerUserPerStream?: number | null
  globalCooldown?: number | null
  isPaused: boolean
  isInStock: boolean
  redemptionsThisStream?: number | null
  autoFulfill: boolean
  cooldownExpiryDate?: Date | null
  image: string
}

export type CustomRewardMenuItemFragment = {
  __typename?: "CustomReward"
  id: string
  title: string
  backgroundColor: string
  isEnabled: boolean
  isPaused: boolean
  image: string
}

export type RandomWheelDetailsFragment = {
  __typename?: "RandomWheel"
  id: string
  slug: string
  name?: string | null
  createdAt: Date
  rotation: number
  spinDuration: number
  fadeDuration: number
  accessType: string
  editable: boolean
  editAnonymous: boolean
  uniqueEntries: boolean
  shareToken?: string | null
  liked: boolean
  theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
  _count?: { __typename?: "RandomWheelCount"; entries: number } | null
}

export type RandomWheelEntryFragment = { __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }

export type RandomWheelWinnerFragment = {
  __typename?: "RandomWheelWinner"
  id: string
  name: string
  createdAt: Date
  winnerIndex?: number | null
}

export type RandomWheelMemberFragment = {
  __typename?: "RandomWheelMember"
  id: string
  roleName: string
  user: { __typename?: "User"; id: string; username: string; displayname?: string | null }
}

export type RandomWheelSyncFragment = {
  __typename?: "RandomWheelSync"
  id: string
  randomWheelId: string
  eventSubscriptionId?: string | null
  rewardId: string
  paused: boolean
  useInput: boolean
  pending: boolean
  createdAt: Date
}

export type RewardGroupFragment = {
  __typename?: "RewardGroup"
  id: string
  name?: string | null
  active: boolean
  triggerSelected: boolean
  userId: string
  cooldownExpiry?: Date | null
  items?: Array<{
    __typename?: "RewardGroupItem"
    id: string
    rewardGroupId: string
    rewardId: string
    rewardEnabled: boolean
    triggerCooldown: boolean
  }> | null
}

export type RewardGroupDetailsFragment = {
  __typename?: "RewardGroup"
  id: string
  name?: string | null
  active: boolean
  triggerSelected: boolean
  userId: string
  cooldownExpiry?: Date | null
}

export type RewardGroupItemFragment = {
  __typename?: "RewardGroupItem"
  id: string
  rewardGroupId: string
  rewardId: string
  rewardEnabled: boolean
  triggerCooldown: boolean
}

export type RewardLinkFragment = {
  __typename?: "RewardLink"
  id: string
  userId: string
  rewardId: string
  token: string
  type: string
}

export type NormalUserFragment = { __typename?: "User"; id: string; username: string; displayname?: string | null }

export type UserNameFragment = { __typename?: "User"; id: string; username: string; displayname?: string | null }

export type UserAccessTokenFragment = {
  __typename?: "UserAccessToken"
  id: string
  scope: Array<string>
  expiresIn: number
  obtainmentTimestamp: bigint
  twitchUserId?: string | null
  twitchUsername?: string | null
}

export type LoginMutationVariables = Exact<{
  username: Scalars["String"]["input"]
  password: Scalars["String"]["input"]
}>

export type LoginMutation = {
  __typename?: "Mutation"
  login: {
    __typename?: "UserResponse"
    user?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean }

export type AddRandomWheelEntryMutationVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
  name: Scalars["String"]["input"]
}>

export type AddRandomWheelEntryMutation = {
  __typename?: "Mutation"
  addRandomWheelEntry: { __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }
}

export type ClearRandomWheelMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type ClearRandomWheelMutation = { __typename?: "Mutation"; clearRandomWheel: number }

export type CreateRandomWheelMutationVariables = Exact<{
  name?: InputMaybe<Scalars["String"]["input"]>
  accessType?: InputMaybe<Scalars["String"]["input"]>
  spinDuration?: InputMaybe<Scalars["Int"]["input"]>
  fadeDuration?: InputMaybe<Scalars["Int"]["input"]>
  editAnonymous?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type CreateRandomWheelMutation = {
  __typename?: "Mutation"
  createRandomWheel: {
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: string | null
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: string | null
    liked: boolean
    theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
    _count?: { __typename?: "RandomWheelCount"; entries: number } | null
  }
}

export type DeleteRandomWheelMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRandomWheelMutation = {
  __typename?: "Mutation"
  deleteRandomWheel?: { __typename?: "AppError"; errorMessage?: string | null; errorCode: number } | null
}

export type DeleteRandomWheelEntryMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRandomWheelEntryMutation = { __typename?: "Mutation"; deleteRandomWheelEntry?: boolean | null }

export type LikeRandomWheelMutationVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
  like: Scalars["Boolean"]["input"]
}>

export type LikeRandomWheelMutation = {
  __typename?: "Mutation"
  likeRandomWheel?: {
    __typename?: "RandomWheelLike"
    id: string
    userId: string
    randomWheelId: string
    createdAt: Date
  } | null
}

export type ResetShareTokenMutationVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
}>

export type ResetShareTokenMutation = { __typename?: "Mutation"; resetShareToken?: boolean | null }

export type SpinRandomWheelMutationVariables = Exact<{
  wheelId: Scalars["String"]["input"]
}>

export type SpinRandomWheelMutation = {
  __typename?: "Mutation"
  spinRandomWheel: {
    __typename?: "RandomWheelWinner"
    id: string
    name: string
    createdAt: Date
    drawnById?: string | null
    randomWheelId: string
    winnerIndex?: number | null
  }
}

export type UpdateRandomWheelMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  options: RandomWheelInput
}>

export type UpdateRandomWheelMutation = {
  __typename?: "Mutation"
  updateRandomWheel?: {
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: string | null
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: string | null
    liked: boolean
    theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
    _count?: { __typename?: "RandomWheelCount"; entries: number } | null
  } | null
}

export type UpdateRandomWheelEntryMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  entry: RandomWheelEntryInput
}>

export type UpdateRandomWheelEntryMutation = {
  __typename?: "Mutation"
  updateRandomWheelEntry: { __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }
}

export type UpdateRandomWheelMembersMutationVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
  members: Array<RandomWheelMemberInput> | RandomWheelMemberInput
}>

export type UpdateRandomWheelMembersMutation = {
  __typename?: "Mutation"
  updateRandomWheelMembers?: Array<{ __typename?: "RandomWheelMember"; id: string }> | null
}

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"]["input"]
  password: Scalars["String"]["input"]
  displayname?: InputMaybe<Scalars["String"]["input"]>
}>

export type RegisterMutation = {
  __typename?: "Mutation"
  register: {
    __typename?: "UserResponse"
    user?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
  }
}

export type AddWheelSyncMutationVariables = Exact<{
  rewardId: Scalars["String"]["input"]
  randomWheelId: Scalars["String"]["input"]
  useInput?: InputMaybe<Scalars["Boolean"]["input"]>
  addExisting?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type AddWheelSyncMutation = {
  __typename?: "Mutation"
  addWheelSync?: {
    __typename?: "RandomWheelSync"
    id: string
    randomWheelId: string
    eventSubscriptionId?: string | null
    rewardId: string
    paused: boolean
    useInput: boolean
    pending: boolean
    createdAt: Date
  } | null
}

export type DeleteWheelSyncMutationVariables = Exact<{
  ids: Array<Scalars["String"]["input"]> | Scalars["String"]["input"]
}>

export type DeleteWheelSyncMutation = { __typename?: "Mutation"; deleteWheelSync?: boolean | null }

export type DisconnectAccessTokenMutationVariables = Exact<{ [key: string]: never }>

export type DisconnectAccessTokenMutation = { __typename?: "Mutation"; disconnectAccessToken: boolean }

export type PauseWheelSyncMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  paused: Scalars["Boolean"]["input"]
}>

export type PauseWheelSyncMutation = {
  __typename?: "Mutation"
  pauseWheelSync?: {
    __typename?: "RandomWheelSync"
    id: string
    randomWheelId: string
    eventSubscriptionId?: string | null
    rewardId: string
    paused: boolean
    useInput: boolean
    pending: boolean
    createdAt: Date
  } | null
}

export type CreateChannelRewardMutationVariables = Exact<{
  reward: CustomRewardCreateInput
}>

export type CreateChannelRewardMutation = {
  __typename?: "Mutation"
  createChannelReward?: {
    __typename?: "CustomReward"
    id: string
    broadcasterId: string
    broadcasterName: string
    broadcasterDisplayName: string
    backgroundColor: string
    isEnabled: boolean
    cost: number
    title: string
    prompt: string
    userInputRequired: boolean
    maxRedemptionsPerStream?: number | null
    maxRedemptionsPerUserPerStream?: number | null
    globalCooldown?: number | null
    isPaused: boolean
    isInStock: boolean
    redemptionsThisStream?: number | null
    autoFulfill: boolean
    cooldownExpiryDate?: Date | null
    image: string
  } | null
}

export type CreateRewardLinkMutationVariables = Exact<{
  rewardId: Scalars["String"]["input"]
  type: Scalars["String"]["input"]
}>

export type CreateRewardLinkMutation = {
  __typename?: "Mutation"
  createRewardLink?: {
    __typename?: "RewardLink"
    id: string
    userId: string
    rewardId: string
    token: string
    type: string
  } | null
}

export type DeleteChannelRewardMutationVariables = Exact<{
  rewardId: Scalars["String"]["input"]
}>

export type DeleteChannelRewardMutation = { __typename?: "Mutation"; deleteChannelReward: boolean }

export type DeleteRewardLinkMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRewardLinkMutation = { __typename?: "Mutation"; deleteRewardLink: boolean }

export type UpdateChannelRewardMutationVariables = Exact<{
  rewardId: Scalars["String"]["input"]
  reward: CustomRewardUpdateInput
}>

export type UpdateChannelRewardMutation = {
  __typename?: "Mutation"
  updateChannelReward?: {
    __typename?: "CustomReward"
    id: string
    broadcasterId: string
    broadcasterName: string
    broadcasterDisplayName: string
    backgroundColor: string
    isEnabled: boolean
    cost: number
    title: string
    prompt: string
    userInputRequired: boolean
    maxRedemptionsPerStream?: number | null
    maxRedemptionsPerUserPerStream?: number | null
    globalCooldown?: number | null
    isPaused: boolean
    isInStock: boolean
    redemptionsThisStream?: number | null
    autoFulfill: boolean
    cooldownExpiryDate?: Date | null
    image: string
  } | null
}

export type UpdateRewardTokenMutationVariables = Exact<{
  type: Scalars["String"]["input"]
  token: Scalars["String"]["input"]
}>

export type UpdateRewardTokenMutation = {
  __typename?: "Mutation"
  updateRewardToken: {
    __typename?: "CustomReward"
    id: string
    title: string
    backgroundColor: string
    isEnabled: boolean
    isPaused: boolean
    image: string
  }
}

export type AddRewardGroupItemMutationVariables = Exact<{
  rewardGroupId: Scalars["String"]["input"]
  rewardId: Scalars["String"]["input"]
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type AddRewardGroupItemMutation = {
  __typename?: "Mutation"
  addRewardGroupItem?: {
    __typename?: "RewardGroupItem"
    id: string
    rewardGroupId: string
    rewardId: string
    rewardEnabled: boolean
    triggerCooldown: boolean
  } | null
}

export type CreateRewardGroupMutationVariables = Exact<{
  rewardGroup: RewardGroupInput
  items: Array<RewardGroupItemInput> | RewardGroupItemInput
}>

export type CreateRewardGroupMutation = {
  __typename?: "Mutation"
  createRewardGroup?: {
    __typename?: "RewardGroup"
    id: string
    name?: string | null
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Date | null
    items?: Array<{
      __typename?: "RewardGroupItem"
      id: string
      rewardGroupId: string
      rewardId: string
      rewardEnabled: boolean
      triggerCooldown: boolean
    }> | null
  } | null
}

export type DeleteRewardGroupMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRewardGroupMutation = { __typename?: "Mutation"; deleteRewardGroup?: boolean | null }

export type DeleteRewardGroupItemMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRewardGroupItemMutation = { __typename?: "Mutation"; deleteRewardGroupItem?: boolean | null }

export type UpdateRewardGroupMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  rewardGroup?: InputMaybe<RewardGroupInput>
  items?: InputMaybe<Array<RewardGroupItemInput> | RewardGroupItemInput>
}>

export type UpdateRewardGroupMutation = {
  __typename?: "Mutation"
  updateRewardGroup?: {
    __typename?: "RewardGroup"
    id: string
    name?: string | null
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Date | null
    items?: Array<{
      __typename?: "RewardGroupItem"
      id: string
      rewardGroupId: string
      rewardId: string
      rewardEnabled: boolean
      triggerCooldown: boolean
    }> | null
  } | null
}

export type UpdateRewardGroupItemMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  rewardEnabled?: InputMaybe<Scalars["Boolean"]["input"]>
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type UpdateRewardGroupItemMutation = {
  __typename?: "Mutation"
  updateRewardGroupItem?: {
    __typename?: "RewardGroupItem"
    id: string
    rewardGroupId: string
    rewardId: string
    rewardEnabled: boolean
    triggerCooldown: boolean
  } | null
}

export type UpdateUserMutationVariables = Exact<{
  user: UserInput
}>

export type UpdateUserMutation = {
  __typename?: "Mutation"
  updateUser: {
    __typename?: "UserResponse"
    user?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
  }
}

export type ColorThemesQueryVariables = Exact<{
  type?: InputMaybe<Scalars["String"]["input"]>
}>

export type ColorThemesQuery = {
  __typename?: "Query"
  colorThemes: Array<{
    __typename?: "ColorTheme"
    id: string
    name?: string | null
    colors: Array<string>
    creatorId?: string | null
    global: boolean
  }>
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: "Query"
  me?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
}

export type MyRandomWheelsQueryVariables = Exact<{
  type?: InputMaybe<Scalars["String"]["input"]>
}>

export type MyRandomWheelsQuery = {
  __typename?: "Query"
  myRandomWheels: Array<{
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: string | null
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: string | null
    liked: boolean
    theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
    _count?: { __typename?: "RandomWheelCount"; entries: number } | null
  }>
}

export type RandomWheelBySlugQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugQuery = {
  __typename?: "Query"
  randomWheelBySlug?: {
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: string | null
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: string | null
    liked: boolean
    owner?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
    members: Array<{
      __typename?: "RandomWheelMember"
      id: string
      roleName: string
      user: { __typename?: "User"; id: string; username: string; displayname?: string | null }
    }>
    theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
    _count?: { __typename?: "RandomWheelCount"; entries: number } | null
  } | null
}

export type RandomWheelBySlugShareTokenQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugShareTokenQuery = {
  __typename?: "Query"
  randomWheelBySlug?: { __typename?: "RandomWheel"; shareToken?: string | null } | null
}

export type RandomWheelBySlugEntriesQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugEntriesQuery = {
  __typename?: "Query"
  randomWheelBySlug?: {
    __typename?: "RandomWheel"
    id: string
    entries: Array<{ __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }>
  } | null
}

export type RandomWheelBySlugMembersQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugMembersQuery = {
  __typename?: "Query"
  randomWheelBySlug?: {
    __typename?: "RandomWheel"
    id: string
    members: Array<{
      __typename?: "RandomWheelMember"
      id: string
      roleName: string
      user: { __typename?: "User"; id: string; username: string; displayname?: string | null }
    }>
  } | null
}

export type RandomWheelBySlugWinnersQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugWinnersQuery = {
  __typename?: "Query"
  randomWheelBySlug?: {
    __typename?: "RandomWheel"
    id: string
    winners: Array<{
      __typename?: "RandomWheelWinner"
      id: string
      name: string
      createdAt: Date
      winnerIndex?: number | null
    }>
  } | null
}

export type ChannelRewardsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars["String"]["input"]>
  onlyManageable?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type ChannelRewardsQuery = {
  __typename?: "Query"
  channelRewards: Array<{
    __typename?: "CustomReward"
    id: string
    broadcasterId: string
    broadcasterName: string
    broadcasterDisplayName: string
    backgroundColor: string
    isEnabled: boolean
    cost: number
    title: string
    prompt: string
    userInputRequired: boolean
    maxRedemptionsPerStream?: number | null
    maxRedemptionsPerUserPerStream?: number | null
    globalCooldown?: number | null
    isPaused: boolean
    isInStock: boolean
    redemptionsThisStream?: number | null
    autoFulfill: boolean
    cooldownExpiryDate?: Date | null
    image: string
  }>
}

export type RewardByTokenQueryVariables = Exact<{
  type: Scalars["String"]["input"]
  token: Scalars["String"]["input"]
}>

export type RewardByTokenQuery = {
  __typename?: "Query"
  rewardByToken: {
    __typename?: "CustomReward"
    id: string
    title: string
    backgroundColor: string
    isEnabled: boolean
    isPaused: boolean
    image: string
  }
}

export type RewardGroupQueryVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type RewardGroupQuery = {
  __typename?: "Query"
  rewardGroup: {
    __typename?: "RewardGroup"
    id: string
    name?: string | null
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Date | null
    items?: Array<{
      __typename?: "RewardGroupItem"
      id: string
      rewardGroupId: string
      rewardId: string
      rewardEnabled: boolean
      triggerCooldown: boolean
    }> | null
  }
}

export type RewardGroupsQueryVariables = Exact<{
  items?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type RewardGroupsQuery = {
  __typename?: "Query"
  rewardGroups: Array<{
    __typename?: "RewardGroup"
    id: string
    name?: string | null
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Date | null
    items?: Array<{
      __typename?: "RewardGroupItem"
      id: string
      rewardGroupId: string
      rewardId: string
      rewardEnabled: boolean
      triggerCooldown: boolean
    }> | null
  }>
}

export type RewardLinksQueryVariables = Exact<{
  rewardIds?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>
}>

export type RewardLinksQuery = {
  __typename?: "Query"
  rewardLinks: Array<{
    __typename?: "RewardLink"
    id: string
    userId: string
    rewardId: string
    token: string
    type: string
  }>
}

export type SyncForWheelQueryVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
}>

export type SyncForWheelQuery = {
  __typename?: "Query"
  syncForWheel: Array<{
    __typename?: "RandomWheelSync"
    id: string
    randomWheelId: string
    eventSubscriptionId?: string | null
    rewardId: string
    paused: boolean
    useInput: boolean
    pending: boolean
    createdAt: Date
    reward?: {
      __typename?: "CustomReward"
      id: string
      title: string
      backgroundColor: string
      isEnabled: boolean
      isPaused: boolean
      image: string
    } | null
  }>
}

export type UserAccessTokenQueryVariables = Exact<{ [key: string]: never }>

export type UserAccessTokenQuery = {
  __typename?: "Query"
  userAccesToken?: {
    __typename?: "UserAccessToken"
    id: string
    scope: Array<string>
    expiresIn: number
    obtainmentTimestamp: bigint
    twitchUserId?: string | null
    twitchUsername?: string | null
  } | null
}

export type UsernameExistsMutationVariables = Exact<{
  username: Scalars["String"]["input"]
}>

export type UsernameExistsMutation = { __typename?: "Mutation"; usernameExists: boolean }

export const ColorThemeFragmentDoc = gql`
  fragment ColorTheme on ColorTheme {
    id
    name
    colors
    creatorId
    global
  }
`
export const CustomRewardFragmentDoc = gql`
  fragment CustomReward on CustomReward {
    id
    broadcasterId
    broadcasterName
    broadcasterDisplayName
    backgroundColor
    isEnabled
    cost
    title
    prompt
    userInputRequired
    maxRedemptionsPerStream
    maxRedemptionsPerUserPerStream
    globalCooldown
    isPaused
    isInStock
    redemptionsThisStream
    autoFulfill
    cooldownExpiryDate
    image
  }
`
export const CustomRewardMenuItemFragmentDoc = gql`
  fragment CustomRewardMenuItem on CustomReward {
    id
    title
    backgroundColor
    isEnabled
    isPaused
    image
  }
`
export const RandomWheelDetailsFragmentDoc = gql`
  fragment RandomWheelDetails on RandomWheel {
    id
    slug
    name
    createdAt
    rotation
    spinDuration
    fadeDuration
    accessType
    editable
    editAnonymous
    uniqueEntries
    shareToken
    liked
    theme {
      id
      name
      colors
    }
    _count {
      entries
    }
  }
`
export const RandomWheelEntryFragmentDoc = gql`
  fragment RandomWheelEntry on RandomWheelEntry {
    id
    name
    weight
  }
`
export const RandomWheelWinnerFragmentDoc = gql`
  fragment RandomWheelWinner on RandomWheelWinner {
    id
    name
    createdAt
    winnerIndex
  }
`
export const UserNameFragmentDoc = gql`
  fragment UserName on User {
    id
    username
    displayname
  }
`
export const RandomWheelMemberFragmentDoc = gql`
  fragment RandomWheelMember on RandomWheelMember {
    id
    roleName
    user {
      ...UserName
    }
  }
  ${UserNameFragmentDoc}
`
export const RandomWheelSyncFragmentDoc = gql`
  fragment RandomWheelSync on RandomWheelSync {
    id
    randomWheelId
    eventSubscriptionId
    rewardId
    paused
    useInput
    pending
    createdAt
  }
`
export const RewardGroupDetailsFragmentDoc = gql`
  fragment RewardGroupDetails on RewardGroup {
    id
    name
    active
    triggerSelected
    userId
    cooldownExpiry
  }
`
export const RewardGroupItemFragmentDoc = gql`
  fragment RewardGroupItem on RewardGroupItem {
    id
    rewardGroupId
    rewardId
    rewardEnabled
    triggerCooldown
  }
`
export const RewardGroupFragmentDoc = gql`
  fragment RewardGroup on RewardGroup {
    ...RewardGroupDetails
    items {
      ...RewardGroupItem
    }
  }
  ${RewardGroupDetailsFragmentDoc}
  ${RewardGroupItemFragmentDoc}
`
export const RewardLinkFragmentDoc = gql`
  fragment RewardLink on RewardLink {
    id
    userId
    rewardId
    token
    type
  }
`
export const NormalUserFragmentDoc = gql`
  fragment NormalUser on User {
    id
    username
    displayname
  }
`
export const UserAccessTokenFragmentDoc = gql`
  fragment UserAccessToken on UserAccessToken {
    id
    scope
    expiresIn
    obtainmentTimestamp
    twitchUserId
    twitchUsername
  }
`
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        ...NormalUser
      }
      errors {
        field
        message
      }
    }
  }
  ${NormalUserFragmentDoc}
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument)
}
export const AddRandomWheelEntryDocument = gql`
  mutation AddRandomWheelEntry($randomWheelId: String!, $name: String!) {
    addRandomWheelEntry(randomWheelId: $randomWheelId, name: $name) {
      ...RandomWheelEntry
    }
  }
  ${RandomWheelEntryFragmentDoc}
`

export function useAddRandomWheelEntryMutation() {
  return Urql.useMutation<AddRandomWheelEntryMutation, AddRandomWheelEntryMutationVariables>(
    AddRandomWheelEntryDocument
  )
}
export const ClearRandomWheelDocument = gql`
  mutation ClearRandomWheel($id: String!) {
    clearRandomWheel(id: $id)
  }
`

export function useClearRandomWheelMutation() {
  return Urql.useMutation<ClearRandomWheelMutation, ClearRandomWheelMutationVariables>(ClearRandomWheelDocument)
}
export const CreateRandomWheelDocument = gql`
  mutation CreateRandomWheel(
    $name: String
    $accessType: String
    $spinDuration: Int
    $fadeDuration: Int
    $editAnonymous: Boolean
  ) {
    createRandomWheel(
      name: $name
      accessType: $accessType
      spinDuration: $spinDuration
      fadeDuration: $fadeDuration
      editAnonymous: $editAnonymous
    ) {
      ...RandomWheelDetails
    }
  }
  ${RandomWheelDetailsFragmentDoc}
`

export function useCreateRandomWheelMutation() {
  return Urql.useMutation<CreateRandomWheelMutation, CreateRandomWheelMutationVariables>(CreateRandomWheelDocument)
}
export const DeleteRandomWheelDocument = gql`
  mutation DeleteRandomWheel($id: String!) {
    deleteRandomWheel(id: $id) {
      errorMessage
      errorCode
    }
  }
`

export function useDeleteRandomWheelMutation() {
  return Urql.useMutation<DeleteRandomWheelMutation, DeleteRandomWheelMutationVariables>(DeleteRandomWheelDocument)
}
export const DeleteRandomWheelEntryDocument = gql`
  mutation DeleteRandomWheelEntry($id: String!) {
    deleteRandomWheelEntry(id: $id)
  }
`

export function useDeleteRandomWheelEntryMutation() {
  return Urql.useMutation<DeleteRandomWheelEntryMutation, DeleteRandomWheelEntryMutationVariables>(
    DeleteRandomWheelEntryDocument
  )
}
export const LikeRandomWheelDocument = gql`
  mutation LikeRandomWheel($randomWheelId: String!, $like: Boolean!) {
    likeRandomWheel(randomWheelId: $randomWheelId, like: $like) {
      id
      userId
      randomWheelId
      createdAt
    }
  }
`

export function useLikeRandomWheelMutation() {
  return Urql.useMutation<LikeRandomWheelMutation, LikeRandomWheelMutationVariables>(LikeRandomWheelDocument)
}
export const ResetShareTokenDocument = gql`
  mutation ResetShareToken($randomWheelId: String!) {
    resetShareToken(randommWheelId: $randomWheelId)
  }
`

export function useResetShareTokenMutation() {
  return Urql.useMutation<ResetShareTokenMutation, ResetShareTokenMutationVariables>(ResetShareTokenDocument)
}
export const SpinRandomWheelDocument = gql`
  mutation SpinRandomWheel($wheelId: String!) {
    spinRandomWheel(randommWheelId: $wheelId) {
      id
      name
      createdAt
      drawnById
      randomWheelId
      winnerIndex
    }
  }
`

export function useSpinRandomWheelMutation() {
  return Urql.useMutation<SpinRandomWheelMutation, SpinRandomWheelMutationVariables>(SpinRandomWheelDocument)
}
export const UpdateRandomWheelDocument = gql`
  mutation UpdateRandomWheel($id: String!, $options: RandomWheelInput!) {
    updateRandomWheel(id: $id, options: $options) {
      ...RandomWheelDetails
    }
  }
  ${RandomWheelDetailsFragmentDoc}
`

export function useUpdateRandomWheelMutation() {
  return Urql.useMutation<UpdateRandomWheelMutation, UpdateRandomWheelMutationVariables>(UpdateRandomWheelDocument)
}
export const UpdateRandomWheelEntryDocument = gql`
  mutation UpdateRandomWheelEntry($id: String!, $entry: RandomWheelEntryInput!) {
    updateRandomWheelEntry(id: $id, entry: $entry) {
      ...RandomWheelEntry
    }
  }
  ${RandomWheelEntryFragmentDoc}
`

export function useUpdateRandomWheelEntryMutation() {
  return Urql.useMutation<UpdateRandomWheelEntryMutation, UpdateRandomWheelEntryMutationVariables>(
    UpdateRandomWheelEntryDocument
  )
}
export const UpdateRandomWheelMembersDocument = gql`
  mutation UpdateRandomWheelMembers($randomWheelId: String!, $members: [RandomWheelMemberInput!]!) {
    updateRandomWheelMembers(randomWheelId: $randomWheelId, members: $members) {
      id
    }
  }
`

export function useUpdateRandomWheelMembersMutation() {
  return Urql.useMutation<UpdateRandomWheelMembersMutation, UpdateRandomWheelMembersMutationVariables>(
    UpdateRandomWheelMembersDocument
  )
}
export const RegisterDocument = gql`
  mutation Register($username: String!, $password: String!, $displayname: String) {
    register(username: $username, password: $password, displayname: $displayname) {
      user {
        ...NormalUser
      }
      errors {
        field
        message
      }
    }
  }
  ${NormalUserFragmentDoc}
`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument)
}
export const AddWheelSyncDocument = gql`
  mutation AddWheelSync($rewardId: String!, $randomWheelId: String!, $useInput: Boolean, $addExisting: Boolean) {
    addWheelSync(rewardId: $rewardId, randomWheelId: $randomWheelId, useInput: $useInput, addExisting: $addExisting) {
      ...RandomWheelSync
    }
  }
  ${RandomWheelSyncFragmentDoc}
`

export function useAddWheelSyncMutation() {
  return Urql.useMutation<AddWheelSyncMutation, AddWheelSyncMutationVariables>(AddWheelSyncDocument)
}
export const DeleteWheelSyncDocument = gql`
  mutation DeleteWheelSync($ids: [String!]!) {
    deleteWheelSync(ids: $ids)
  }
`

export function useDeleteWheelSyncMutation() {
  return Urql.useMutation<DeleteWheelSyncMutation, DeleteWheelSyncMutationVariables>(DeleteWheelSyncDocument)
}
export const DisconnectAccessTokenDocument = gql`
  mutation DisconnectAccessToken {
    disconnectAccessToken
  }
`

export function useDisconnectAccessTokenMutation() {
  return Urql.useMutation<DisconnectAccessTokenMutation, DisconnectAccessTokenMutationVariables>(
    DisconnectAccessTokenDocument
  )
}
export const PauseWheelSyncDocument = gql`
  mutation PauseWheelSync($id: String!, $paused: Boolean!) {
    pauseWheelSync(id: $id, paused: $paused) {
      ...RandomWheelSync
    }
  }
  ${RandomWheelSyncFragmentDoc}
`

export function usePauseWheelSyncMutation() {
  return Urql.useMutation<PauseWheelSyncMutation, PauseWheelSyncMutationVariables>(PauseWheelSyncDocument)
}
export const CreateChannelRewardDocument = gql`
  mutation CreateChannelReward($reward: CustomRewardCreateInput!) {
    createChannelReward(reward: $reward) {
      ...CustomReward
    }
  }
  ${CustomRewardFragmentDoc}
`

export function useCreateChannelRewardMutation() {
  return Urql.useMutation<CreateChannelRewardMutation, CreateChannelRewardMutationVariables>(
    CreateChannelRewardDocument
  )
}
export const CreateRewardLinkDocument = gql`
  mutation CreateRewardLink($rewardId: String!, $type: String!) {
    createRewardLink(rewardId: $rewardId, type: $type) {
      ...RewardLink
    }
  }
  ${RewardLinkFragmentDoc}
`

export function useCreateRewardLinkMutation() {
  return Urql.useMutation<CreateRewardLinkMutation, CreateRewardLinkMutationVariables>(CreateRewardLinkDocument)
}
export const DeleteChannelRewardDocument = gql`
  mutation DeleteChannelReward($rewardId: String!) {
    deleteChannelReward(rewardId: $rewardId)
  }
`

export function useDeleteChannelRewardMutation() {
  return Urql.useMutation<DeleteChannelRewardMutation, DeleteChannelRewardMutationVariables>(
    DeleteChannelRewardDocument
  )
}
export const DeleteRewardLinkDocument = gql`
  mutation DeleteRewardLink($id: String!) {
    deleteRewardLink(id: $id)
  }
`

export function useDeleteRewardLinkMutation() {
  return Urql.useMutation<DeleteRewardLinkMutation, DeleteRewardLinkMutationVariables>(DeleteRewardLinkDocument)
}
export const UpdateChannelRewardDocument = gql`
  mutation UpdateChannelReward($rewardId: String!, $reward: CustomRewardUpdateInput!) {
    updateChannelReward(rewardId: $rewardId, reward: $reward) {
      ...CustomReward
    }
  }
  ${CustomRewardFragmentDoc}
`

export function useUpdateChannelRewardMutation() {
  return Urql.useMutation<UpdateChannelRewardMutation, UpdateChannelRewardMutationVariables>(
    UpdateChannelRewardDocument
  )
}
export const UpdateRewardTokenDocument = gql`
  mutation UpdateRewardToken($type: String!, $token: String!) {
    updateRewardToken(type: $type, token: $token) {
      ...CustomRewardMenuItem
    }
  }
  ${CustomRewardMenuItemFragmentDoc}
`

export function useUpdateRewardTokenMutation() {
  return Urql.useMutation<UpdateRewardTokenMutation, UpdateRewardTokenMutationVariables>(UpdateRewardTokenDocument)
}
export const AddRewardGroupItemDocument = gql`
  mutation AddRewardGroupItem($rewardGroupId: String!, $rewardId: String!, $triggerCooldown: Boolean) {
    addRewardGroupItem(rewardId: $rewardId, rewardGroupId: $rewardGroupId, triggerCooldown: $triggerCooldown) {
      ...RewardGroupItem
    }
  }
  ${RewardGroupItemFragmentDoc}
`

export function useAddRewardGroupItemMutation() {
  return Urql.useMutation<AddRewardGroupItemMutation, AddRewardGroupItemMutationVariables>(AddRewardGroupItemDocument)
}
export const CreateRewardGroupDocument = gql`
  mutation CreateRewardGroup($rewardGroup: RewardGroupInput!, $items: [RewardGroupItemInput!]!) {
    createRewardGroup(rewardGroup: $rewardGroup, items: $items) {
      ...RewardGroup
    }
  }
  ${RewardGroupFragmentDoc}
`

export function useCreateRewardGroupMutation() {
  return Urql.useMutation<CreateRewardGroupMutation, CreateRewardGroupMutationVariables>(CreateRewardGroupDocument)
}
export const DeleteRewardGroupDocument = gql`
  mutation DeleteRewardGroup($id: String!) {
    deleteRewardGroup(id: $id)
  }
`

export function useDeleteRewardGroupMutation() {
  return Urql.useMutation<DeleteRewardGroupMutation, DeleteRewardGroupMutationVariables>(DeleteRewardGroupDocument)
}
export const DeleteRewardGroupItemDocument = gql`
  mutation DeleteRewardGroupItem($id: String!) {
    deleteRewardGroupItem(id: $id)
  }
`

export function useDeleteRewardGroupItemMutation() {
  return Urql.useMutation<DeleteRewardGroupItemMutation, DeleteRewardGroupItemMutationVariables>(
    DeleteRewardGroupItemDocument
  )
}
export const UpdateRewardGroupDocument = gql`
  mutation UpdateRewardGroup($id: String!, $rewardGroup: RewardGroupInput, $items: [RewardGroupItemInput!]) {
    updateRewardGroup(id: $id, rewardGroup: $rewardGroup, items: $items) {
      ...RewardGroup
    }
  }
  ${RewardGroupFragmentDoc}
`

export function useUpdateRewardGroupMutation() {
  return Urql.useMutation<UpdateRewardGroupMutation, UpdateRewardGroupMutationVariables>(UpdateRewardGroupDocument)
}
export const UpdateRewardGroupItemDocument = gql`
  mutation UpdateRewardGroupItem($id: String!, $rewardEnabled: Boolean, $triggerCooldown: Boolean) {
    updateRewardGroupItem(id: $id, rewardEnabled: $rewardEnabled, triggerCooldown: $triggerCooldown) {
      ...RewardGroupItem
    }
  }
  ${RewardGroupItemFragmentDoc}
`

export function useUpdateRewardGroupItemMutation() {
  return Urql.useMutation<UpdateRewardGroupItemMutation, UpdateRewardGroupItemMutationVariables>(
    UpdateRewardGroupItemDocument
  )
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
      user {
        ...NormalUser
      }
      errors {
        field
        message
      }
    }
  }
  ${NormalUserFragmentDoc}
`

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument)
}
export const ColorThemesDocument = gql`
  query ColorThemes($type: String) {
    colorThemes(type: $type) {
      ...ColorTheme
    }
  }
  ${ColorThemeFragmentDoc}
`

export function useColorThemesQuery(options?: Omit<Urql.UseQueryArgs<ColorThemesQueryVariables>, "query">) {
  return Urql.useQuery<ColorThemesQuery, ColorThemesQueryVariables>({ query: ColorThemesDocument, ...options })
}
export const MeDocument = gql`
  query Me {
    me {
      ...NormalUser
    }
  }
  ${NormalUserFragmentDoc}
`

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options })
}
export const MyRandomWheelsDocument = gql`
  query MyRandomWheels($type: String) {
    myRandomWheels(type: $type) {
      ...RandomWheelDetails
    }
  }
  ${RandomWheelDetailsFragmentDoc}
`

export function useMyRandomWheelsQuery(options?: Omit<Urql.UseQueryArgs<MyRandomWheelsQueryVariables>, "query">) {
  return Urql.useQuery<MyRandomWheelsQuery, MyRandomWheelsQueryVariables>({ query: MyRandomWheelsDocument, ...options })
}
export const RandomWheelBySlugDocument = gql`
  query RandomWheelBySlug($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
      ...RandomWheelDetails
      owner {
        ...UserName
      }
      members {
        ...RandomWheelMember
      }
    }
  }
  ${RandomWheelDetailsFragmentDoc}
  ${UserNameFragmentDoc}
  ${RandomWheelMemberFragmentDoc}
`

export function useRandomWheelBySlugQuery(options: Omit<Urql.UseQueryArgs<RandomWheelBySlugQueryVariables>, "query">) {
  return Urql.useQuery<RandomWheelBySlugQuery, RandomWheelBySlugQueryVariables>({
    query: RandomWheelBySlugDocument,
    ...options,
  })
}
export const RandomWheelBySlugShareTokenDocument = gql`
  query RandomWheelBySlugShareToken($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
      shareToken
    }
  }
`

export function useRandomWheelBySlugShareTokenQuery(
  options: Omit<Urql.UseQueryArgs<RandomWheelBySlugShareTokenQueryVariables>, "query">
) {
  return Urql.useQuery<RandomWheelBySlugShareTokenQuery, RandomWheelBySlugShareTokenQueryVariables>({
    query: RandomWheelBySlugShareTokenDocument,
    ...options,
  })
}
export const RandomWheelBySlugEntriesDocument = gql`
  query RandomWheelBySlugEntries($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
      id
      entries {
        ...RandomWheelEntry
      }
    }
  }
  ${RandomWheelEntryFragmentDoc}
`

export function useRandomWheelBySlugEntriesQuery(
  options: Omit<Urql.UseQueryArgs<RandomWheelBySlugEntriesQueryVariables>, "query">
) {
  return Urql.useQuery<RandomWheelBySlugEntriesQuery, RandomWheelBySlugEntriesQueryVariables>({
    query: RandomWheelBySlugEntriesDocument,
    ...options,
  })
}
export const RandomWheelBySlugMembersDocument = gql`
  query RandomWheelBySlugMembers($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
      id
      members {
        ...RandomWheelMember
      }
    }
  }
  ${RandomWheelMemberFragmentDoc}
`

export function useRandomWheelBySlugMembersQuery(
  options: Omit<Urql.UseQueryArgs<RandomWheelBySlugMembersQueryVariables>, "query">
) {
  return Urql.useQuery<RandomWheelBySlugMembersQuery, RandomWheelBySlugMembersQueryVariables>({
    query: RandomWheelBySlugMembersDocument,
    ...options,
  })
}
export const RandomWheelBySlugWinnersDocument = gql`
  query RandomWheelBySlugWinners($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
      id
      winners {
        ...RandomWheelWinner
      }
    }
  }
  ${RandomWheelWinnerFragmentDoc}
`

export function useRandomWheelBySlugWinnersQuery(
  options: Omit<Urql.UseQueryArgs<RandomWheelBySlugWinnersQueryVariables>, "query">
) {
  return Urql.useQuery<RandomWheelBySlugWinnersQuery, RandomWheelBySlugWinnersQueryVariables>({
    query: RandomWheelBySlugWinnersDocument,
    ...options,
  })
}
export const ChannelRewardsDocument = gql`
  query ChannelRewards($userId: String, $onlyManageable: Boolean) {
    channelRewards(userId: $userId, onlyManageable: $onlyManageable) {
      ...CustomReward
    }
  }
  ${CustomRewardFragmentDoc}
`

export function useChannelRewardsQuery(options?: Omit<Urql.UseQueryArgs<ChannelRewardsQueryVariables>, "query">) {
  return Urql.useQuery<ChannelRewardsQuery, ChannelRewardsQueryVariables>({ query: ChannelRewardsDocument, ...options })
}
export const RewardByTokenDocument = gql`
  query RewardByToken($type: String!, $token: String!) {
    rewardByToken(type: $type, token: $token) {
      ...CustomRewardMenuItem
    }
  }
  ${CustomRewardMenuItemFragmentDoc}
`

export function useRewardByTokenQuery(options: Omit<Urql.UseQueryArgs<RewardByTokenQueryVariables>, "query">) {
  return Urql.useQuery<RewardByTokenQuery, RewardByTokenQueryVariables>({ query: RewardByTokenDocument, ...options })
}
export const RewardGroupDocument = gql`
  query RewardGroup($id: String!) {
    rewardGroup(id: $id) {
      ...RewardGroup
    }
  }
  ${RewardGroupFragmentDoc}
`

export function useRewardGroupQuery(options: Omit<Urql.UseQueryArgs<RewardGroupQueryVariables>, "query">) {
  return Urql.useQuery<RewardGroupQuery, RewardGroupQueryVariables>({ query: RewardGroupDocument, ...options })
}
export const RewardGroupsDocument = gql`
  query RewardGroups($items: Boolean) {
    rewardGroups(items: $items) {
      ...RewardGroup
    }
  }
  ${RewardGroupFragmentDoc}
`

export function useRewardGroupsQuery(options?: Omit<Urql.UseQueryArgs<RewardGroupsQueryVariables>, "query">) {
  return Urql.useQuery<RewardGroupsQuery, RewardGroupsQueryVariables>({ query: RewardGroupsDocument, ...options })
}
export const RewardLinksDocument = gql`
  query RewardLinks($rewardIds: [String!]) {
    rewardLinks(rewardIds: $rewardIds) {
      id
      userId
      rewardId
      token
      type
    }
  }
`

export function useRewardLinksQuery(options?: Omit<Urql.UseQueryArgs<RewardLinksQueryVariables>, "query">) {
  return Urql.useQuery<RewardLinksQuery, RewardLinksQueryVariables>({ query: RewardLinksDocument, ...options })
}
export const SyncForWheelDocument = gql`
  query SyncForWheel($randomWheelId: String!) {
    syncForWheel(randomWheelId: $randomWheelId) {
      ...RandomWheelSync
      reward {
        ...CustomRewardMenuItem
      }
    }
  }
  ${RandomWheelSyncFragmentDoc}
  ${CustomRewardMenuItemFragmentDoc}
`

export function useSyncForWheelQuery(options: Omit<Urql.UseQueryArgs<SyncForWheelQueryVariables>, "query">) {
  return Urql.useQuery<SyncForWheelQuery, SyncForWheelQueryVariables>({ query: SyncForWheelDocument, ...options })
}
export const UserAccessTokenDocument = gql`
  query UserAccessToken {
    userAccesToken {
      ...UserAccessToken
    }
  }
  ${UserAccessTokenFragmentDoc}
`

export function useUserAccessTokenQuery(options?: Omit<Urql.UseQueryArgs<UserAccessTokenQueryVariables>, "query">) {
  return Urql.useQuery<UserAccessTokenQuery, UserAccessTokenQueryVariables>({
    query: UserAccessTokenDocument,
    ...options,
  })
}
export const UsernameExistsDocument = gql`
  mutation UsernameExists($username: String!) {
    usernameExists(username: $username)
  }
`

export function useUsernameExistsMutation() {
  return Urql.useMutation<UsernameExistsMutation, UsernameExistsMutationVariables>(UsernameExistsDocument)
}
