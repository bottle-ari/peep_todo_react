import React from 'react';
import { useSpring, to, animated, config } from '@react-spring/web';
import { scale } from 'vec-la';
import { useDrag } from '@use-gesture/react';
import styles from '../styles/animation.module.css';
import Image from "next/image";

export const FadePeep = () => {

  return (
    <animated.div className={styles.box}/>
  );
}


const FlyingPeep = () => {

  const initialPosition = [0, 0];
  const [{ pos }, api] = useSpring(() => ({ pos: [0, 0] }));
  const [{ angle }, angleApi] = useSpring(() => ({
    angle: 0,
    config: config.wobbly,
  }));

  const bind = useDrag(
   ({ movement: pos, velocity, direction, down }) => {
      if (down) {
        api.start({
          pos,
          immediate: true,
          config: {  velocity: scale(direction, velocity), decay: true },
        });
        angleApi.start({ angle: Math.atan2(direction[0], -direction[1]) });
      } else {
        api.start({
          pos: initialPosition,
          immediate: true,
          config: { decay: true },
        });
        angleApi.start({angle: 0})
      }
    }
  );
  
  return (
    <animated.div
      className={styles.peep}
      {...bind()}
      style={{
        transform: to(
          [pos, angle],
          ([x, y], a) => `translate3d(${x}px,${y}px,0) rotate(${a}rad)`
        ),
      }}
    >
      {/* Render the SVG */}
      <Image
        src="/images/logo.svg"
        alt="Animation of Profile"
        width={140}
        height={140}
        priority={true}
        draggable={false}
      />
    </animated.div>
  );
};

export default FlyingPeep;
