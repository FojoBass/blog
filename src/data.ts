import { IconType } from 'react-icons/lib';
import {
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillGithub,
  AiOutlineInstagram,
} from 'react-icons/ai';

export interface DropLinkType {
  title: string;
  link: string;
  param: boolean;
  position: string;
}

export interface SideNavLinkType {
  Icon: IconType;
  title: string;
  link: string;
}

export interface SocialLinkType {
  Icon: IconType;
  link: string;
}

export const dropLinks: DropLinkType[] = [
  {
    title: 'Username',
    link: '/p/dum',
    param: true,
    position: 'top',
  },
  {
    title: 'Dashboard',
    link: '/dum/dashboard',
    param: true,
    position: 'mid',
  },
  {
    title: 'Create Post',
    link: '/new-post',
    param: false,
    position: 'mid',
  },
  {
    title: 'Settings',
    link: '/settings',
    param: false,
    position: 'mid',
  },
];

export const sideNavLinks: SideNavLinkType[] = [
  { Icon: AiOutlineHome, title: 'Home', link: '/' },
  { Icon: AiOutlineQuestionCircle, title: 'FAQ', link: '/faqs' },
  { Icon: AiOutlineInfoCircle, title: 'About', link: '/know-us' },
  { Icon: AiOutlineMail, title: 'Contact', link: '/meet-us' },
];
export const socialLinks: SocialLinkType[] = [
  { Icon: AiOutlineTwitter, link: 'https://twitter.com/Fojobass' },
  { Icon: AiFillFacebook, link: 'https://facebook.com/fosimubo.olubo' },
  { Icon: AiFillGithub, link: 'https://github.com/Fojobass' },
  { Icon: AiOutlineInstagram, link: 'https://instagram.com/fojo_bass/' },
];
