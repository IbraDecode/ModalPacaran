import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { clsx } from 'clsx';

const moodMap = {
  loading: 'https://lottie.host/425037ba-b402-426e-aa3f-ccc95db5fb55/IJF6xCT4AL.lottie',
  welcome: 'https://lottie.host/8ed59247-d8d4-4480-a9ee-0240be717200/m4i2U5IAGE.lottie',
  idle: 'https://lottie.host/92c71487-72d1-440e-91a7-5135d0c96737/bSEfm70ckN.lottie',
  success: 'https://lottie.host/ccb9c479-d3f2-49ff-a0b9-32eefc719e0d/VfRjOvavIa.lottie',
  fail: 'https://lottie.host/2b5a924f-8beb-4bd3-83ff-81eca4ad0744/BFCl0vEiRp.lottie',
  coding: 'https://lottie.host/da22beea-5995-4666-85ff-30c1e4d1d3dc/uIWXyvkeqg.lottie',
  '404': 'https://lottie.host/bd40a338-c003-4e5e-b269-d509672c9130/WuQLTAMTNn.lottie',
};

const Kucing = ({ mood, className }: { mood: keyof typeof moodMap; className?: string }) => (
  <div className={clsx('w-full flex justify-center', className)}>
    <DotLottieReact
      src={moodMap[mood]}
      loop
      autoplay
      style={{ width: '240px', height: '240px' }}
      className="drop-shadow-xl"
    />
  </div>
);

export default Kucing;
