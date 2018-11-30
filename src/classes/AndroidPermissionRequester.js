import { PermissionsAndroid } from 'react-native';


export async function requestPermission(permissionName) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[permissionName],
      {
        'title': 'Arabic Speaker App '.concat(permissionName).concat(' Permission'),
        'message': 'Arabic Speaker App needs access to your '.concat(permissionName)
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
  }
}