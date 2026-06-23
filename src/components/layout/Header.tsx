import type { NavItem, CTAButton } from '@/types'
import HeaderClient from './HeaderClient'

interface HeaderProps {
  navItems: NavItem[]
  ctaButton?: CTAButton
  /** Set true on pages with a hero section to start transparent */
  transparent?: boolean
  logoUrl?: string
}

export default function Header({ navItems, ctaButton, transparent = false, logoUrl }: HeaderProps) {
  return <HeaderClient navItems={navItems} ctaButton={ctaButton} transparent={transparent} logoUrl={logoUrl} />
}
