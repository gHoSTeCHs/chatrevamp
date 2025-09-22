import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';

export default function App() {
	return (
		<ScrollView className="flex-1 bg-gray-50">
			<View className="bg-white shadow-sm">
				<View className="flex-row items-center justify-between px-6 py-4">
					<Text className="text-2xl font-bold text-gray-900">ChatRevamp</Text>
					<View className="flex-row space-x-4">
						<TouchableOpacity className="px-4 py-2 rounded-lg bg-blue-500">
							<Text className="text-white font-medium">Sign In</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<View className="px-6 py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
				<View className="items-center">
					<Text className="text-4xl font-bold text-gray-900 text-center mb-4">
						Transform Your Conversations
					</Text>
					<Text className="text-xl text-gray-600 text-center mb-8 max-w-2xl">
						Experience the next generation of chat applications with AI-powered
						features and seamless communication
					</Text>
					<View className="flex-row space-x-4">
						<TouchableOpacity className="px-8 py-4 bg-blue-600 rounded-lg">
							<Text className="text-white font-semibold text-lg">
								Get Started
							</Text>
						</TouchableOpacity>
						<TouchableOpacity className="px-8 py-4 border-2 border-gray-300 rounded-lg">
							<Text className="text-gray-700 font-semibold text-lg">
								Learn More
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<View className="px-6 py-16">
				<Text className="text-3xl font-bold text-center text-gray-900 mb-12">
					Powerful Features
				</Text>
				<View className="space-y-8">
					<View className="bg-white p-6 rounded-xl shadow-sm">
						<View className="w-12 h-12 bg-blue-100 rounded-lg items-center justify-center mb-4">
							<Text className="text-blue-600 text-2xl">💬</Text>
						</View>
						<Text className="text-xl font-semibold text-gray-900 mb-2">
							Smart Messaging
						</Text>
						<Text className="text-gray-600">
							AI-powered message suggestions and smart replies to enhance your
							conversations
						</Text>
					</View>

					<View className="bg-white p-6 rounded-xl shadow-sm">
						<View className="w-12 h-12 bg-green-100 rounded-lg items-center justify-center mb-4">
							<Text className="text-green-600 text-2xl">🔒</Text>
						</View>
						<Text className="text-xl font-semibold text-gray-900 mb-2">
							End-to-End Encryption
						</Text>
						<Text className="text-gray-600">
							Your messages are secured with military-grade encryption for
							complete privacy
						</Text>
					</View>

					<View className="bg-white p-6 rounded-xl shadow-sm">
						<View className="w-12 h-12 bg-purple-100 rounded-lg items-center justify-center mb-4">
							<Text className="text-purple-600 text-2xl">⚡</Text>
						</View>
						<Text className="text-xl font-semibold text-gray-900 mb-2">
							Lightning Fast
						</Text>
						<Text className="text-gray-600">
							Optimized performance ensures your messages are delivered
							instantly
						</Text>
					</View>
				</View>
			</View>

			<View className="px-6 py-16 bg-gray-900">
				<Text className="text-3xl font-bold text-center text-white mb-12">
					Trusted by Millions
				</Text>
				<View className="flex-row justify-around">
					<View className="items-center">
						<Text className="text-4xl font-bold text-blue-400 mb-2">10M+</Text>
						<Text className="text-gray-300">Active Users</Text>
					</View>
					<View className="items-center">
						<Text className="text-4xl font-bold text-green-400 mb-2">
							99.9%
						</Text>
						<Text className="text-gray-300">Uptime</Text>
					</View>
					<View className="items-center">
						<Text className="text-4xl font-bold text-purple-400 mb-2">
							150+
						</Text>
						<Text className="text-gray-300">Countries</Text>
					</View>
				</View>
			</View>

			<View className="px-6 py-16">
				<Text className="text-3xl font-bold text-center text-gray-900 mb-12">
					What Our Users Say
				</Text>
				<View className="space-y-6">
					<View className="bg-white p-6 rounded-xl shadow-sm">
						<Text className="text-gray-600 mb-4 italic">
							{
								'ChatRevamp has completely transformed how I communicate with my team. The AI features are incredible!'
							}
						</Text>
						<View className="flex-row items-center">
							<View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
								<Text className="text-white font-bold">JS</Text>
							</View>
							<View>
								<Text className="font-semibold text-gray-900">John Smith</Text>
								<Text className="text-gray-500 text-sm">Product Manager</Text>
							</View>
						</View>
					</View>

					<View className="bg-white p-6 rounded-xl shadow-sm">
						<Text className="text-gray-600 mb-4 italic">
							{
								'The security features give me peace of mind. I know my conversations are always private.'
							}
						</Text>
						<View className="flex-row items-center">
							<View className="w-10 h-10 bg-green-500 rounded-full items-center justify-center mr-3">
								<Text className="text-white font-bold">MJ</Text>
							</View>
							<View>
								<Text className="font-semibold text-gray-900">
									Maria Johnson
								</Text>
								<Text className="text-gray-500 text-sm">Security Analyst</Text>
							</View>
						</View>
					</View>

					<View className="bg-white p-6 rounded-xl shadow-sm">
						<Text className="text-gray-600 mb-4 italic">
							{
								"Lightning fast and incredibly reliable. Best chat app I've ever used!"
							}
						</Text>
						<View className="flex-row items-center">
							<View className="w-10 h-10 bg-purple-500 rounded-full items-center justify-center mr-3">
								<Text className="text-white font-bold">DL</Text>
							</View>
							<View>
								<Text className="font-semibold text-gray-900">David Lee</Text>
								<Text className="text-gray-500 text-sm">Software Engineer</Text>
							</View>
						</View>
					</View>
				</View>
			</View>

			<View className="px-6 py-16 bg-blue-600">
				<View className="items-center">
					<Text className="text-3xl font-bold text-white text-center mb-4">
						Ready to Get Started?
					</Text>
					<Text className="text-xl text-blue-100 text-center mb-8">
						Join millions of users who trust ChatRevamp for their communication
						needs
					</Text>
					<TouchableOpacity className="px-8 py-4 bg-white rounded-lg">
						<Text className="text-blue-600 font-semibold text-lg">
							Download Now
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View className="px-6 py-12 bg-gray-900">
				<View className="items-center mb-8">
					<Text className="text-2xl font-bold text-white mb-4">ChatRevamp</Text>
					<Text className="text-gray-400 text-center">
						The future of communication is here
					</Text>
				</View>
				<View className="flex-row justify-around mb-8">
					<View>
						<Text className="text-white font-semibold mb-2">Product</Text>
						<Text className="text-gray-400 mb-1">Features</Text>
						<Text className="text-gray-400 mb-1">Pricing</Text>
						<Text className="text-gray-400">Security</Text>
					</View>
					<View>
						<Text className="text-white font-semibold mb-2">Company</Text>
						<Text className="text-gray-400 mb-1">About</Text>
						<Text className="text-gray-400 mb-1">Careers</Text>
						<Text className="text-gray-400">Contact</Text>
					</View>
					<View>
						<Text className="text-white font-semibold mb-2">Support</Text>
						<Text className="text-gray-400 mb-1">Help Center</Text>
						<Text className="text-gray-400 mb-1">Community</Text>
						<Text className="text-gray-400">Status</Text>
					</View>
				</View>
				<View className="border-t border-gray-800 pt-8">
					<Text className="text-gray-400 text-center">
						© 2024 ChatRevamp. All rights reserved.
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}
