import React from 'react';
import styles from './ProfilePage.module.css';

function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContent}>
        <div className={styles.introColumn}>
          {/* <div className={styles.aboutImageWrapper}> */}
            <img loading="lazy" src="https://sedshub.com/wp-content/uploads/2022/01/fashion-artist-sandra-burke.jpg" className={styles.aboutImage} alt="About Mercy Carl" />
          {/* </div> */}
        </div>
        <div className={styles.aboutTextColumn}>
          <p className={styles.aboutText}>
            Lorem ipsum dolor sit amet consectetur. Amet eros tortor nisl ac integer. Scelerisque blandit duis viverra enim. Nunc pellentesque odio eu diam scelerisque. Mattis nunc viverra nisl lorem tellus. Egestas ipsum et adipiscing ornare felis placerat nec convallis. Quisque ultricies tristique interdum tempus. Mattis eu lectus ultrices placerat odio id mauris. Nullam odio diam aliquam quam risus mollis. Pretium in et velit donec. Massa eget quis pharetra interdum nisl morbi volutpat. Sed arcu enim tincidunt et a adipiscing elementum rhoncus. Ut fames semper eget odio pharetra aliquet consequat facilisi amet. Consequat proin lacus posuere volutpat magna aliquam senectus elit arcu. Vitae sit dictum congue a amet aliquam. 
            <br /> 
            <br /> 
            Dictum non euismod venenatis dignissim posuere. Tempus mollis risus id venenatis. Gravida morbi massa vitae egestas pharetra in. Donec phasellus convallis lorem laoreet magna sapien. Lacus ornare in elit at aliquet. Ac euismod enim risus purus eu faucibus neque consequat auctor. Viverra lectus penatibus mollis nunc ac ornare malesuada. Nibh tincidunt nunc purus parturient pulvinar tempus eget est. Diam enim ut viverra eget donec. Arcu turpis enim porttitor nullam nunc proin. Nisi imperdiet nec vitae diam morbi eleifend. Ipsum in mi malesuada dignissim. Diam egestas consequat donec pretium volutpat libero cursus elementum. lectus nulla nisl accumsan interdum scelerisque at. Aliquet ut ipsum tellus nunc erat. Id quis diam lacus elit. 
            <br /> 
            <br /> 
            Elementum pellentesque ullamcorper aliquet praesent ut et condimentum. Arcu sit mauris dictum sed. Viverra scelerisque vestibulum adipiscing porttitor proin pretium. Ut elit ipsum fermentum urna eu eleifend. Sollicitudin consectetur nulla facilisis in. Tristique elementum lectus nulla nisl accumsan interdum scelerisque at. Aliquet ut ipsum tellus nunc erat. Id quis diam lacus elit.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;