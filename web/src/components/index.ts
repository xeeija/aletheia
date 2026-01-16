// "use client"
// workaround for not-working re-exports of client components for next app router
// https://github.com/vercel/next.js/issues/41940#issuecomment-1480885131
// explicit re-export would also help, or split imports into @/components and @/components/client
// or try Next 15 RC -> https://nextjs.org/blog/next-15-rc, and see if it fixes the bug

// Export components here from subfolders
// export * from "./common"
// export * from "./input"
// export * from "./layout"
// export * from "./navigation"
// export * from "./providers/Providers"
// export * from "./user"

// ### explicit re-export of everything
export { WebVitals } from "./WebVitals"

// common
export { AboutDialog } from "./common/AboutDialog"
export { ButtonContainer } from "./common/ButtonContainer"
export { CollapsedAlert } from "./common/CollapsedAlert"
export { CooldownTimer } from "./common/CooldownTimer"
export { Dropdown } from "./common/Dropdown"
export { EnvInfoBadge } from "./common/EnvInfoBadgeApp"
export { LinkList } from "./common/LinkList"
export { LinkListItem, type LinkItem } from "./common/LinkListItem"
export { LinkText } from "./common/LinkText"
export { LoadingButton } from "./common/LoadingButton"
export { LoadingIconButton } from "./common/LoadingIconButton"
export { LogoIcon } from "./common/LogoIcon"
export { LogoListItem } from "./common/LogoListItem"
export { NoData } from "./common/NoData"
// export { PageContainer } from "./common/PageContainer"
export { RelativeTime } from "./common/RelativeTime"
export { SkeletonList } from "./common/SkeletonList"
export { TabPanel } from "./common/TabPanel"
export { Tooltip } from "./common/Tooltip"

export { AlertContent } from "./common/alert/AlertContent"
export { AlertPopup } from "./common/alert/AlertPopup"

export { ConfirmDialog, type ConfirmDialogProps } from "./common/dialog/ConfirmDialog"
export { DeleteDialog } from "./common/dialog/DeleteDialog"

export { ErrorFallback } from "./common/fallback/ErrorFallback"
export { NotFound } from "./common/fallback/NotFound"

// input
export { BooleanField } from "./input/BooleanField"
export { BooleanFieldHelper } from "./input/BooleanFieldHelper"
export { BooleanFieldLabel } from "./input/BooleanFieldLabel"
export { BooleanFieldPlain } from "./input/BooleanFieldPlain"
export { ColorMenuItem } from "./input/ColorMenuItem"
export { FilterSelect } from "./input/FilterSelect"
export { FormDialog } from "./input/FormDialog"
export { InputField, type InputFieldProps } from "./input/InputField"
export { InputFieldBasic, type BaseInputFieldProps, type InputFieldBasicProps } from "./input/InputFieldBasic"
export { LinkInputField } from "./input/LinkInputField"
export { MaxLengthAdornment } from "./input/MaxLengthAdornment"
export { NumberField } from "./input/NumberField"
export { PasswordField } from "./input/PasswordField"
export { RadioGroupField, type RadioOption } from "./input/RadioGroupField"
export { SelectField, type SelectOption } from "./input/SelectField"
export { SliderField } from "./input/SliderField"

// layout
export { ClientRootLayout } from "./layout/ClientRootLayout"
export { defaultLayout, getTitle, type LayoutNextPage } from "./layout/defaultLayout"

// navigation
// export { AppNavbar } from "./navigation/AppNavbar"
export { AppSidebar } from "./navigation/AppSidebar"
export { Footer } from "./navigation/Footer"
export { Navbar } from "./navigation/Navbar"
export { Navigation, type NavigationProps } from "./navigation/Navigation"
export { Sidebar, transitionMixin } from "./navigation/Sidebar"

// providers
export { Providers } from "./providers/Providers"

// user
export { DisconnectTwitchDialog } from "./user/DisconnectTwitchDialog"
export { LoginForm } from "./user/LoginForm"
export { RegisterForm } from "./user/RegisterForm"
export { UserAvatar } from "./user/UserAvatar"
export { UserMenu } from "./user/UserMenu"
// somehow build fails with UserMenuApp export, because next/headers (in urql client)
// can only be imported into Server Components, not pages/ directory
// export { UserMenuApp } from "./user/UserMenuApp"
export { LogoutButton } from "./user/LogoutButton"
export { UserMenuDropdown } from "./user/UserMenuDropdown"
export { UserStatusDot } from "./user/UserStatusDot"
