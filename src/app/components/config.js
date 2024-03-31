export default function getEnv(item) {
  if (item === 'key') {
    return 'sk-eCvn6pyEgQv0GGi2B9F1CfD52fC44eF8B21b4882109d1823';
  } else if (item === 'url') {
    return 'https://oneapi.run.place/v1/';
  } else if (item === 'model') {
    return 'gpt-3.5-turbo';
  } else {
    return null
  }
}
