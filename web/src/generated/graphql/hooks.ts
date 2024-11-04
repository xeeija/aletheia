"use client"

import * as Operations from "./graphql"
import * as Urql from "@urql/next"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function useLoginMutation() {
  return Urql.useMutation<Operations.LoginMutation, Operations.LoginMutationVariables>(Operations.LoginDocument)
}

export function useLogoutMutation() {
  return Urql.useMutation<Operations.LogoutMutation, Operations.LogoutMutationVariables>(Operations.LogoutDocument)
}

export function useAddRandomWheelEntryMutation() {
  return Urql.useMutation<Operations.AddRandomWheelEntryMutation, Operations.AddRandomWheelEntryMutationVariables>(
    Operations.AddRandomWheelEntryDocument
  )
}

export function useClearRandomWheelMutation() {
  return Urql.useMutation<Operations.ClearRandomWheelMutation, Operations.ClearRandomWheelMutationVariables>(
    Operations.ClearRandomWheelDocument
  )
}

export function useCreateRandomWheelMutation() {
  return Urql.useMutation<Operations.CreateRandomWheelMutation, Operations.CreateRandomWheelMutationVariables>(
    Operations.CreateRandomWheelDocument
  )
}

export function useDeleteRandomWheelMutation() {
  return Urql.useMutation<Operations.DeleteRandomWheelMutation, Operations.DeleteRandomWheelMutationVariables>(
    Operations.DeleteRandomWheelDocument
  )
}

export function useDeleteRandomWheelEntryMutation() {
  return Urql.useMutation<
    Operations.DeleteRandomWheelEntryMutation,
    Operations.DeleteRandomWheelEntryMutationVariables
  >(Operations.DeleteRandomWheelEntryDocument)
}

export function useLikeRandomWheelMutation() {
  return Urql.useMutation<Operations.LikeRandomWheelMutation, Operations.LikeRandomWheelMutationVariables>(
    Operations.LikeRandomWheelDocument
  )
}

export function useResetShareTokenMutation() {
  return Urql.useMutation<Operations.ResetShareTokenMutation, Operations.ResetShareTokenMutationVariables>(
    Operations.ResetShareTokenDocument
  )
}

export function useSpinRandomWheelMutation() {
  return Urql.useMutation<Operations.SpinRandomWheelMutation, Operations.SpinRandomWheelMutationVariables>(
    Operations.SpinRandomWheelDocument
  )
}

export function useUpdateRandomWheelMutation() {
  return Urql.useMutation<Operations.UpdateRandomWheelMutation, Operations.UpdateRandomWheelMutationVariables>(
    Operations.UpdateRandomWheelDocument
  )
}

export function useUpdateRandomWheelEntryMutation() {
  return Urql.useMutation<
    Operations.UpdateRandomWheelEntryMutation,
    Operations.UpdateRandomWheelEntryMutationVariables
  >(Operations.UpdateRandomWheelEntryDocument)
}

export function useUpdateRandomWheelMembersMutation() {
  return Urql.useMutation<
    Operations.UpdateRandomWheelMembersMutation,
    Operations.UpdateRandomWheelMembersMutationVariables
  >(Operations.UpdateRandomWheelMembersDocument)
}

export function useRegisterMutation() {
  return Urql.useMutation<Operations.RegisterMutation, Operations.RegisterMutationVariables>(
    Operations.RegisterDocument
  )
}

export function useAddWheelSyncMutation() {
  return Urql.useMutation<Operations.AddWheelSyncMutation, Operations.AddWheelSyncMutationVariables>(
    Operations.AddWheelSyncDocument
  )
}

export function useDeleteWheelSyncMutation() {
  return Urql.useMutation<Operations.DeleteWheelSyncMutation, Operations.DeleteWheelSyncMutationVariables>(
    Operations.DeleteWheelSyncDocument
  )
}

export function useDisconnectAccessTokenMutation() {
  return Urql.useMutation<Operations.DisconnectAccessTokenMutation, Operations.DisconnectAccessTokenMutationVariables>(
    Operations.DisconnectAccessTokenDocument
  )
}

export function usePauseWheelSyncMutation() {
  return Urql.useMutation<Operations.PauseWheelSyncMutation, Operations.PauseWheelSyncMutationVariables>(
    Operations.PauseWheelSyncDocument
  )
}

export function useCreateChannelRewardMutation() {
  return Urql.useMutation<Operations.CreateChannelRewardMutation, Operations.CreateChannelRewardMutationVariables>(
    Operations.CreateChannelRewardDocument
  )
}

export function useCreateRewardLinkMutation() {
  return Urql.useMutation<Operations.CreateRewardLinkMutation, Operations.CreateRewardLinkMutationVariables>(
    Operations.CreateRewardLinkDocument
  )
}

export function useDeleteChannelRewardMutation() {
  return Urql.useMutation<Operations.DeleteChannelRewardMutation, Operations.DeleteChannelRewardMutationVariables>(
    Operations.DeleteChannelRewardDocument
  )
}

export function useDeleteRewardLinkMutation() {
  return Urql.useMutation<Operations.DeleteRewardLinkMutation, Operations.DeleteRewardLinkMutationVariables>(
    Operations.DeleteRewardLinkDocument
  )
}

export function useUpdateChannelRewardMutation() {
  return Urql.useMutation<Operations.UpdateChannelRewardMutation, Operations.UpdateChannelRewardMutationVariables>(
    Operations.UpdateChannelRewardDocument
  )
}

export function useUpdateRewardTokenMutation() {
  return Urql.useMutation<Operations.UpdateRewardTokenMutation, Operations.UpdateRewardTokenMutationVariables>(
    Operations.UpdateRewardTokenDocument
  )
}

export function useAddRewardGroupItemMutation() {
  return Urql.useMutation<Operations.AddRewardGroupItemMutation, Operations.AddRewardGroupItemMutationVariables>(
    Operations.AddRewardGroupItemDocument
  )
}

export function useCreateRewardGroupMutation() {
  return Urql.useMutation<Operations.CreateRewardGroupMutation, Operations.CreateRewardGroupMutationVariables>(
    Operations.CreateRewardGroupDocument
  )
}

export function useDeleteRewardGroupMutation() {
  return Urql.useMutation<Operations.DeleteRewardGroupMutation, Operations.DeleteRewardGroupMutationVariables>(
    Operations.DeleteRewardGroupDocument
  )
}

export function useDeleteRewardGroupItemMutation() {
  return Urql.useMutation<Operations.DeleteRewardGroupItemMutation, Operations.DeleteRewardGroupItemMutationVariables>(
    Operations.DeleteRewardGroupItemDocument
  )
}

export function useUpdateRewardGroupMutation() {
  return Urql.useMutation<Operations.UpdateRewardGroupMutation, Operations.UpdateRewardGroupMutationVariables>(
    Operations.UpdateRewardGroupDocument
  )
}

export function useUpdateRewardGroupItemMutation() {
  return Urql.useMutation<Operations.UpdateRewardGroupItemMutation, Operations.UpdateRewardGroupItemMutationVariables>(
    Operations.UpdateRewardGroupItemDocument
  )
}

export function useUpdateUserMutation() {
  return Urql.useMutation<Operations.UpdateUserMutation, Operations.UpdateUserMutationVariables>(
    Operations.UpdateUserDocument
  )
}

export function useColorThemesQuery(options?: Omit<Urql.UseQueryArgs<Operations.ColorThemesQueryVariables>, "query">) {
  return Urql.useQuery<Operations.ColorThemesQuery, Operations.ColorThemesQueryVariables>({
    query: Operations.ColorThemesDocument,
    ...options,
  })
}

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<Operations.MeQueryVariables>, "query">) {
  return Urql.useQuery<Operations.MeQuery, Operations.MeQueryVariables>({ query: Operations.MeDocument, ...options })
}

export function useMyRandomWheelsQuery(
  options?: Omit<Urql.UseQueryArgs<Operations.MyRandomWheelsQueryVariables>, "query">
) {
  return Urql.useQuery<Operations.MyRandomWheelsQuery, Operations.MyRandomWheelsQueryVariables>({
    query: Operations.MyRandomWheelsDocument,
    ...options,
  })
}

export function useRandomWheelBySlugQuery(
  options: Omit<Urql.UseQueryArgs<Operations.RandomWheelBySlugQueryVariables>, "query">
) {
  return Urql.useQuery<Operations.RandomWheelBySlugQuery, Operations.RandomWheelBySlugQueryVariables>({
    query: Operations.RandomWheelBySlugDocument,
    ...options,
  })
}

export function useRandomWheelBySlugShareTokenQuery(
  options: Omit<Urql.UseQueryArgs<Operations.RandomWheelBySlugShareTokenQueryVariables>, "query">
) {
  return Urql.useQuery<
    Operations.RandomWheelBySlugShareTokenQuery,
    Operations.RandomWheelBySlugShareTokenQueryVariables
  >({ query: Operations.RandomWheelBySlugShareTokenDocument, ...options })
}

export function useRandomWheelBySlugEntriesQuery(
  options: Omit<Urql.UseQueryArgs<Operations.RandomWheelBySlugEntriesQueryVariables>, "query">
) {
  return Urql.useQuery<Operations.RandomWheelBySlugEntriesQuery, Operations.RandomWheelBySlugEntriesQueryVariables>({
    query: Operations.RandomWheelBySlugEntriesDocument,
    ...options,
  })
}

export function useRandomWheelBySlugMembersQuery(
  options: Omit<Urql.UseQueryArgs<Operations.RandomWheelBySlugMembersQueryVariables>, "query">
) {
  return Urql.useQuery<Operations.RandomWheelBySlugMembersQuery, Operations.RandomWheelBySlugMembersQueryVariables>({
    query: Operations.RandomWheelBySlugMembersDocument,
    ...options,
  })
}

export function useRandomWheelBySlugWinnersQuery(
  options: Omit<Urql.UseQueryArgs<Operations.RandomWheelBySlugWinnersQueryVariables>, "query">
) {
  return Urql.useQuery<Operations.RandomWheelBySlugWinnersQuery, Operations.RandomWheelBySlugWinnersQueryVariables>({
    query: Operations.RandomWheelBySlugWinnersDocument,
    ...options,
  })
}

export function useChannelRewardsQuery(
  options?: Omit<Urql.UseQueryArgs<Operations.ChannelRewardsQueryVariables>, "query">
) {
  return Urql.useQuery<Operations.ChannelRewardsQuery, Operations.ChannelRewardsQueryVariables>({
    query: Operations.ChannelRewardsDocument,
    ...options,
  })
}

export function useRewardByTokenQuery(
  options: Omit<Urql.UseQueryArgs<Operations.RewardByTokenQueryVariables>, "query">
) {
  return Urql.useQuery<Operations.RewardByTokenQuery, Operations.RewardByTokenQueryVariables>({
    query: Operations.RewardByTokenDocument,
    ...options,
  })
}

export function useRewardGroupQuery(options: Omit<Urql.UseQueryArgs<Operations.RewardGroupQueryVariables>, "query">) {
  return Urql.useQuery<Operations.RewardGroupQuery, Operations.RewardGroupQueryVariables>({
    query: Operations.RewardGroupDocument,
    ...options,
  })
}

export function useRewardGroupsQuery(
  options?: Omit<Urql.UseQueryArgs<Operations.RewardGroupsQueryVariables>, "query">
) {
  return Urql.useQuery<Operations.RewardGroupsQuery, Operations.RewardGroupsQueryVariables>({
    query: Operations.RewardGroupsDocument,
    ...options,
  })
}

export function useRewardLinksQuery(options?: Omit<Urql.UseQueryArgs<Operations.RewardLinksQueryVariables>, "query">) {
  return Urql.useQuery<Operations.RewardLinksQuery, Operations.RewardLinksQueryVariables>({
    query: Operations.RewardLinksDocument,
    ...options,
  })
}

export function useSyncForWheelQuery(options: Omit<Urql.UseQueryArgs<Operations.SyncForWheelQueryVariables>, "query">) {
  return Urql.useQuery<Operations.SyncForWheelQuery, Operations.SyncForWheelQueryVariables>({
    query: Operations.SyncForWheelDocument,
    ...options,
  })
}

export function useUserAccessTokenQuery(
  options?: Omit<Urql.UseQueryArgs<Operations.UserAccessTokenQueryVariables>, "query">
) {
  return Urql.useQuery<Operations.UserAccessTokenQuery, Operations.UserAccessTokenQueryVariables>({
    query: Operations.UserAccessTokenDocument,
    ...options,
  })
}

export function useUsernameExistsMutation() {
  return Urql.useMutation<Operations.UsernameExistsMutation, Operations.UsernameExistsMutationVariables>(
    Operations.UsernameExistsDocument
  )
}
