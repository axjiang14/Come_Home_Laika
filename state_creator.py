import sys, json, re
from PIL import Image

pixel_map = {(0, 255, 0): 'tile_light',
			 (0, 0, 0): 'platform_tile',
			 (255, 0, 0): 'alien'}

def main():
	state_pic = sys.argv[1]
	print('Creating state JSON for:', state_pic)
	filename = re.search('(.*)\.png', state_pic).group(1)

	pic = Image.open(state_pic)
	
	enemies = []
	tiles = []
	
	for x in range(pic.width):
		for y in range(pic.height):
			pixel = pic.getpixel((x, y))
			obj = pixel_map.get(pixel)
			
			if obj:
				print('Placing:', obj, 'at', x, ',', y)
				if 'tile' in obj:
					tiles.append({'sprite': obj, 'x': x, 'y': y})
				elif 'alien' in obj:
					# Find alien minmax x
					min_x = x
					while min_x >= 0 and 'tile' in pixel_map.get(pic.getpixel((min_x, y + 1)), '') and 'alien' in pixel_map.get(pic.getpixel((min_x, y)), 'alien'):
						min_x -= 1
					min_x += 1
					print('alien.min_x:', min_x)
					max_x = x
					while max_x <= pic.width and 'tile' in pixel_map.get(pic.getpixel((max_x, y + 1)), '') and 'alien' in pixel_map.get(pic.getpixel((max_x, y)), 'alien'):
						max_x += 1
					max_x -= 1
					print('alien.min_x:', max_x)
						
					enemies.append({'sprite': obj, 'x': x, 'y': y, 'min_x': min_x, 'max_x': max_x})
	
	json_obj = {'aliens': enemies, 'tiles': tiles}
	with open(filename + '.json', 'w') as f:
		json.dump(json_obj, f, indent=2)

if __name__ == '__main__':
	main()

