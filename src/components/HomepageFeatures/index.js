import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '高可用',
    Svg: require('@site/static/img/undraw_connected_world_wuay.svg').default,
    description: (
      <>

      </>
    ),
  },
  {
    title: '低时延',
    Svg: require('@site/static/img/undraw_fingerprint_re_uf3f.svg').default,
    description: (
      <>

      </>
    ),
  },
  {
    title: '反审查',
    Svg: require('@site/static/img/undraw_world_re_768g.svg').default,
    description: (
      <>

      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
