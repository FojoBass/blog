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
import team1 from './assets/team 1.jpg';
import team2 from './assets/team 2.jpg';
import team3 from './assets/team 3.jpg';
import team4 from './assets/team 4.jpg';

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

export interface TeamInt {
  name: string;
  position: string;
  avi: string;
}

export const team: TeamInt[] = [
  {
    name: 'John Doe',
    position: 'CEO',
    avi: team1,
  },
  {
    name: 'Jane Doe',
    position: 'CTO',
    avi: team2,
  },
  {
    name: 'Lorem Ipsum',
    position: 'HR Manager',
    avi: team3,
  },
  {
    name: 'Greg Payins',
    position: 'Team Lead',
    avi: team4,
  },
  {
    name: 'Janet Briggs',
    position: 'Team Lead',
    avi: team2,
  },
  {
    name: 'Bastin Psychi',
    position: 'Dev Op',
    avi: team4,
  },
  {
    name: 'Wick Gisn',
    position: 'Frontend Dev',
    avi: team1,
  },
  {
    name: 'Ipsum Dolor',
    position: 'HR',
    avi: team3,
  },
];

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
  { Icon: AiOutlineTwitter, link: 'https://x.com/Fojobass' },
  { Icon: AiFillFacebook, link: 'https://facebook.com/fosimubo.olubo' },
  { Icon: AiFillGithub, link: 'https://github.com/Fojobass' },
  { Icon: AiOutlineInstagram, link: 'https://instagram.com/fojo_bass/' },
];

export const regex = {
  alpha: /^[A-Za-z\s]+$/,
  alphaNumberic: /^[a-zA-Z0-9]+$/,
  email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  url: /^(http|https|ftp):\/\/([^\s/$.?#].[^\s]*)?$/,
  strongPword: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
};
