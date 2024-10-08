import type {
	APIApplicationCommand,
	APIApplicationCommandPermission,
	APIGuildApplicationCommandPermissions,
	APIInteractionCallbackLaunchActivity,
	APIInteractionCallbackMessage,
	APIInteractionResponse,
	APIInteractionResponseCallbackData,
	ApplicationCommandType,
	EntryPointCommandHandlerType,
} from '../payloads';
import type { AddUndefinedToPossiblyUndefinedPropertiesOfInterface, NonNullableFields, StrictPartial } from '../utils';
import type {
	RESTDeleteAPIWebhookWithTokenMessageResult,
	RESTGetAPIWebhookWithTokenMessageResult,
	RESTPatchAPIWebhookWithTokenMessageFormDataBody,
	RESTPatchAPIWebhookWithTokenMessageJSONBody,
	RESTPatchAPIWebhookWithTokenMessageResult,
	RESTPostAPIWebhookWithTokenWaitResult,
} from './webhook';

/**
 * https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands
 */
export interface RESTGetAPIApplicationCommandsQuery {
	/**
	 * Whether to include full localization dictionaries (name_localizations and description_localizations)
	 * in the returned objects, instead of the name_localized and description_localized fields.
	 *
	 * @default false
	 */
	with_localizations?: boolean;
}

/**
 * https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands
 */
export type RESTGetAPIApplicationCommandsResult = APIApplicationCommand[];

/**
 * https://discord.com/developers/docs/interactions/application-commands#get-global-application-command
 */
export type RESTGetAPIApplicationCommandResult = APIApplicationCommand;

type RESTPostAPIBaseApplicationCommandsJSONBody = AddUndefinedToPossiblyUndefinedPropertiesOfInterface<
	Omit<
		APIApplicationCommand,
		| 'application_id'
		| 'contexts'
		| 'default_member_permissions'
		| 'description_localized'
		| 'description'
		| 'guild_id'
		| 'id'
		| 'integration_types'
		| 'name_localized'
		| 'type'
		| 'version'
		| 'handler'
	> &
		Partial<
			NonNullableFields<Pick<APIApplicationCommand, 'contexts'>> &
				Pick<APIApplicationCommand, 'default_member_permissions' | 'integration_types'>
		>
>;

/**
 * https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
 */
export interface RESTPostAPIChatInputApplicationCommandsJSONBody extends RESTPostAPIBaseApplicationCommandsJSONBody {
	type?: ApplicationCommandType.ChatInput | undefined;
	description: string;
}

/**
 * https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
 */
export interface RESTPostAPIContextMenuApplicationCommandsJSONBody extends RESTPostAPIBaseApplicationCommandsJSONBody {
	type: ApplicationCommandType.Message | ApplicationCommandType.User;
}

/**
 * https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
 */
export interface RESTPostAPIEntryPointApplicationCommandsJSONBody extends RESTPostAPIBaseApplicationCommandsJSONBody {
	type: ApplicationCommandType.PrimaryEntryPoint;
	description: string;
	handler: EntryPointCommandHandlerType;
}

/**
 * https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
 */
export type RESTPostAPIApplicationCommandsJSONBody =
	| RESTPostAPIChatInputApplicationCommandsJSONBody
	| RESTPostAPIContextMenuApplicationCommandsJSONBody
	| RESTPostAPIEntryPointApplicationCommandsJSONBody;

/**
 * https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
 */
export type RESTPostAPIApplicationCommandsResult = APIApplicationCommand;

/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command
 */
export type RESTPatchAPIApplicationCommandJSONBody = StrictPartial<RESTPostAPIApplicationCommandsJSONBody>;

/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command
 */
export type RESTPatchAPIApplicationCommandResult = APIApplicationCommand;

/**
 * https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
 */
export type RESTPutAPIApplicationCommandsJSONBody = RESTPostAPIApplicationCommandsJSONBody[];

/**
 * https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
 */
export type RESTPutAPIApplicationCommandsResult = APIApplicationCommand[];

/**
 * https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands
 */
export type RESTGetAPIApplicationGuildCommandsQuery = RESTGetAPIApplicationCommandsQuery;

export type RESTAPIApplicationGuildCommand = Omit<APIApplicationCommand, 'dm_permission' | 'handler'>;

/**
 * https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands
 */
export type RESTGetAPIApplicationGuildCommandsResult = RESTAPIApplicationGuildCommand[];

/**
 * https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands
 */
export type RESTGetAPIApplicationGuildCommandResult = RESTAPIApplicationGuildCommand;

/**
 * https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command
 */
export type RESTPostAPIApplicationGuildCommandsJSONBody =
	| Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'dm_permission'>
	| Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'dm_permission'>;

/**
 * https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command
 */
export type RESTPostAPIApplicationGuildCommandsResult = RESTAPIApplicationGuildCommand;

/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command
 */
export type RESTPatchAPIApplicationGuildCommandJSONBody = StrictPartial<
	| Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'dm_permission'>
	| Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'dm_permission'>
>;

/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command
 */
export type RESTPatchAPIApplicationGuildCommandResult = RESTAPIApplicationGuildCommand;

/**
 * https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands
 */
export type RESTPutAPIApplicationGuildCommandsJSONBody = (
	| (Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'dm_permission'> &
			Pick<Partial<APIApplicationCommand>, 'id'>)
	| (Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'dm_permission'> &
			Pick<Partial<APIApplicationCommand>, 'id'>)
)[];

/**
 * https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands
 */
export type RESTPutAPIApplicationGuildCommandsResult = RESTAPIApplicationGuildCommand[];

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response
 */
export type RESTPostAPIInteractionCallbackJSONBody = APIInteractionResponse;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response-query-string-params
 */
export type RESTPostAPIInteractionCallbackQuery = {
	/**
	 * Whether to include a RESTPostAPIInteractionCallbackResult as the response instead of a 204.
	 */
	with_response?: boolean;
};

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback
 */
export type RESTPostAPIInteractionCallbackResult = APIInteractionCallbackLaunchActivity | APIInteractionCallbackMessage;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response
 */
export type RESTPostAPIInteractionCallbackFormDataBody =
	| (Record<`files[${bigint}]`, unknown> & {
			/**
			 * JSON stringified message body
			 */
			payload_json?: string | undefined;
	  })
	| (Record<`files[${bigint}]`, unknown> & RESTPostAPIInteractionCallbackJSONBody);

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response
 */
export type RESTGetAPIInteractionOriginalResponseResult = RESTGetAPIWebhookWithTokenMessageResult;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
 */
export type RESTPatchAPIInteractionOriginalResponseJSONBody = RESTPatchAPIWebhookWithTokenMessageJSONBody;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
 */
export type RESTPatchAPIInteractionOriginalResponseFormDataBody = RESTPatchAPIWebhookWithTokenMessageFormDataBody;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
 */
export type RESTPatchAPIInteractionOriginalResponseResult = RESTPatchAPIWebhookWithTokenMessageResult;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response
 */
export type RESTDeleteAPIInteractionOriginalResponseResult = RESTDeleteAPIWebhookWithTokenMessageResult;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
 */
export type RESTPostAPIInteractionFollowupJSONBody = APIInteractionResponseCallbackData;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
 */
export type RESTPostAPIInteractionFollowupFormDataBody =
	| (Record<`files[${bigint}]`, unknown> & {
			/**
			 * JSON stringified message body
			 */
			payload_json?: string | undefined;
	  })
	| (Record<`files[${bigint}]`, unknown> & RESTPostAPIInteractionFollowupJSONBody);

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
 */
export type RESTPostAPIInteractionFollowupResult = RESTPostAPIWebhookWithTokenWaitResult;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message
 */
export type RESTGetAPIInteractionFollowupResult = RESTGetAPIWebhookWithTokenMessageResult;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
 */
export type RESTPatchAPIInteractionFollowupJSONBody = RESTPatchAPIWebhookWithTokenMessageJSONBody;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
 */
export type RESTPatchAPIInteractionFollowupFormDataBody = RESTPatchAPIWebhookWithTokenMessageFormDataBody;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
 */
export type RESTPatchAPIInteractionFollowupResult = RESTPatchAPIWebhookWithTokenMessageResult;

/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message
 */
export type RESTDeleteAPIInteractionFollowupResult = RESTDeleteAPIWebhookWithTokenMessageResult;

/**
 * https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions
 */
export type RESTGetAPIGuildApplicationCommandsPermissionsResult = APIGuildApplicationCommandPermissions[];

/**
 * https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions
 */
export type RESTGetAPIApplicationCommandPermissionsResult = APIGuildApplicationCommandPermissions;

/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions
 */
export interface RESTPutAPIApplicationCommandPermissionsJSONBody {
	permissions: APIApplicationCommandPermission[];
}

/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions
 */
export type RESTPutAPIApplicationCommandPermissionsResult = APIGuildApplicationCommandPermissions;

/**
 * https://discord.com/developers/docs/interactions/application-commands#batch-edit-application-command-permissions
 */
export type RESTPutAPIGuildApplicationCommandsPermissionsJSONBody = Pick<
	APIGuildApplicationCommandPermissions,
	'id' | 'permissions'
>[];

/**
 * https://discord.com/developers/docs/interactions/application-commands#batch-edit-application-command-permissions
 */
export type RESTPutAPIGuildApplicationCommandsPermissionsResult = APIGuildApplicationCommandPermissions[];
