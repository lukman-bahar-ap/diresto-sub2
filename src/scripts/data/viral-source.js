import viralMenu from '../../DATA-VIRAL-MENU.json';

class ViralSource {
  static async list() {
    const response = await fetch(viralMenu);
    const responseJson = await response.json();
    return responseJson.virals;
  }
}

export default ViralSource;
