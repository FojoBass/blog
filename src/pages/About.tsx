import React from 'react';
import main from '../assets/ab main.jpg';
import { AiOutlineMail, AiOutlineTwitter, AiFillGithub } from 'react-icons/ai';
import { team } from '../data';

const About = () => {
  return (
    <section id='about_sect'>
      <div className='center_sect'>
        <h2 className='about_heading'>About us</h2>

        <div className='about_top_sect'>
          <div className='img_wrapper'>
            <img src={main} alt='' />
          </div>

          <div className='text_wrapper'>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              suscipit illo culpa voluptate nam ducimus quos architecto, rerum
              eligendi dignissimos, quisquam quidem! Molestiae iste, voluptatem
              vel nemo quia minima enim tempore illum, blanditiis sapiente
              beatae voluptatibus officiis recusandae, nesciunt doloribus! Quod,
              quasi cupiditate cumque placeat nam aperiam doloremque officia.
              Eligendi.
            </p>

            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              voluptate quibusdam veniam, earum iusto, sunt natus provident cum,
              voluptas alias ex eos culpa perferendis? Ad, nisi. Praesentium
              voluptatibus minus facere.
            </p>
          </div>
        </div>

        <h3 className='team_heading'>Meet the team</h3>
        <div className='about_bottom_sect'>
          <p className='team_text_wrapper'>
            Our team is lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Labore blanditiis aperiam nihil nesciunt expedita, minima
            commodi, architecto aliquam sint velit facilis tenetur ratione
            aliquid, illum culpa.
          </p>

          <div className='team_wrapper'>
            {team.map(({ name, position, avi }, ind) => (
              <article className='team_card' key={ind}>
                <div className='img_info'>
                  <div className='img_wrapper'>
                    <img src={avi} alt='team member' />
                  </div>

                  <div className='social_icon_wrapper twi'>
                    <button className='social_icon twi'>
                      <AiOutlineTwitter />
                    </button>
                  </div>
                  <div className='social_icon_wrapper git'>
                    <button className='social_icon git'>
                      <AiFillGithub />
                    </button>
                  </div>
                  <div className='social_icon_wrapper mail'>
                    <button className='social_icon mail'>
                      <AiOutlineMail />
                    </button>
                  </div>
                </div>

                <div className='other_info'>
                  <h4 className='name'>{name}</h4>
                  <p className='position'>{position}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
