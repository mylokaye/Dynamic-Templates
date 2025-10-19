/**
 * Dynamic Contact Form Validation System
 *
 * This script provides comprehensive form validation for a contact form with:
 * - Name field validation (2+ characters, letters/spaces/hyphens/apostrophes only)
 * - Email validation (format checking, domain typo detection, disposable email blocking)
 * - Message field validation (3-2000 character limit)
 * - Real-time visual feedback (red borders for errors, green for valid)
 * - Progressive error display (errors show only after user leaves field)
 * - Form state tracking (button enabled/disabled based on validation)
 * - Prevented layout shifts (helper text always reserves space)
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const BRAND_NAME = "Truestory";
const ENABLE_FEEDBACK_BAR = true;
const FEEDBACK_BAR_SHOW_DELAY = 3000; // ms before showing feedback bar
const REDIRECT_URL = null; // Example: "https://google.com"
const REDIRECT_DELAY_MS = 2000; // Delay (ms) before redirect after form submit






    
    // Translation Engine: language dictionaries
const TRANSLATIONS = {
        'en-US': {
            // Navigation
            'nav.privacy': 'Privacy Policy',
            'nav.terms': 'Terms',
            'nav.contact': 'Contact',
            'nav.toggle': 'Toggle navigation menu',
            'nav.language': 'Select language',

            // Main content
            'title': 'Preference Center',
            'intro.line1': 'At [Company Name], your privacy and personal information is important to us.',
            'intro.line2': 'We believe privacy begins with clear choices and control. Our Preference Center allows you to manage your data and select the types of communications you’d like to receive from us.',

            // Form sections
            'section.marketing': 'Marketing Purpose',
            'topic.products': 'Products & Innovations',
            'topic.events': 'Events & Webinars',
            'topic.surveys': 'Surveys & Focus Groups',
            'action.unsubscribe': 'Unsubscribe',

            // Email section
            'email.title': 'Communication preference',
            'email.notice': 'You may unsubscribe from marketing emails on this page, however, we will still send transactional emails (account updates, transactions, regulatory notices) as required by law.',

            // Buttons
            'button.submit': 'Update Preferences',
            'button.submitting': 'Updating...',

            // Notifications
            'notify.select': 'Please select at least one preference option.',
            'notify.success': 'Your preferences have been updated successfully!',
            'notify.error': 'Unable to load required resources. Please refresh the page.',
            'notify.unsaved': 'You have unsaved changes. Are you sure you want to leave?',
            'confirm.unsubscribe': 'Are you sure you want to unsubscribe from all marketing emails?\n\nYou will still receive important transactional emails as required by law.',

            // Footer
            'footer.legal': '[Company Name] is the data controller responsible for processing your personal data in accordance with Regulation (EU) 2016/679 (General Data Protection Regulation). Your consent to receive marketing communications is processed under Article 6(1)(a) GDPR. You have the right to withdraw your consent at any time by updating your preferences through this Privacy Center or by clicking the unsubscribe link in any email we send. You also have rights under Articles 15-22 GDPR, including the right to access, rectify, erase, restrict processing, data portability, and to object to processing of your personal data. For more information about how we process your data, please see our Privacy Policy. To exercise your rights or for data protection inquiries, please contact our Data Protection Officer by using the Contact link on this page.',
            'footer.updated': 'Last updated: Oct-12-2025. V7 - i18n Edition',

            // Feedback system
            'feedback.bar.text': 'Help us make our emails more relevant to you.',
            'feedback.bar.button': 'Give Feedback',
            'feedback.bar.close': 'Dismiss',
            'feedback.modal.title': 'Share Your Feedback',
            'feedback.modal.description': 'How we can improve the emails which we send to you?',
            'feedback.form.label': 'Your feedback',
            'feedback.form.placeholder': 'Tell us what you think...',
            'feedback.form.email.label': 'Email (optional)',
            'feedback.form.email.placeholder': 'your.email@example.com',
            'feedback.button.submit': 'Send',
            'feedback.button.cancel': 'Cancel',
            'feedback.notify.required': 'Please enter your feedback before submitting.',
            'feedback.notify.success': 'Thank you for your feedback!.',
            'feedback.notify.error': 'Unable to submit feedback. Please try again later.'
        },

        'zh': {
            // Navigation
            'nav.privacy': '隐私政策',
            'nav.terms': '条款',
            'nav.contact': '联系我们',
            'nav.toggle': '切换导航菜单',
            'nav.language': '选择语言',

            // Main content
            'title': '偏好中心',
            'intro.line1': '在 [Company Name]，您的隐私和个人信息对我们很重要。',
            'intro.line2': '隐私从为您提供对数据的控制权开始，以及您做出有信心的明智选择所需的工具和信息。通过我们的隐私中心，我们邀请您自定义接收的电子邮件。',

            // Form sections
            'section.marketing': '营销目的',
            'topic.products': '产品与创新',
            'topic.events': '活动与网络研讨会',
            'topic.surveys': '调查与焦点小组',
            'action.unsubscribe': '取消订阅',

            // Email section
            'email.title': '通信偏好',
            'email.notice': '您可以在此页面取消订阅营销电子邮件，但是，我们仍将根据法律要求发送交易电子邮件（账户更新、交易、监管通知）。',

            // Buttons
            'button.submit': '更新偏好',
            'button.submitting': '正在更新...',

            // Notifications
            'notify.select': '请至少选择一个偏好选项。',
            'notify.success': '您的偏好已成功更新！',
            'notify.error': '无法加载所需资源。请刷新页面。',
            'notify.unsaved': '您有未保存的更改。您确定要离开吗？',
            'confirm.unsubscribe': '您确定要取消订阅所有营销通信吗？\n\n您仍将收到重要的交易电子邮件。',

            // Footer
            'footer.legal': '[Company Name] 是根据《欧盟通用数据保护条例》(EU) 2016/679 负责处理您个人数据的数据控制者。您接收营销通信的同意根据 GDPR 第 6(1)(a) 条处理。您有权随时通过此隐私中心更新您的偏好或点击我们发送的任何电子邮件中的取消订阅链接来撤回您的同意。您还享有 GDPR 第 15-22 条规定的权利，包括访问、更正、删除、限制处理、数据可移植性以及反对处理您的个人数据的权利。有关我们如何处理您的数据的更多信息，请参阅我们的隐私政策。要行使您的权利或咨询数据保护问题，请使用此页面上的联系链接联系我们的数据保护官。',
            'footer.updated': '最后更新：2025年10月12日。V7',

            // Feedback system
            'feedback.bar.text': '帮助我们改进体验',
            'feedback.bar.button': '提供反馈',
            'feedback.bar.close': '关闭',
            'feedback.modal.title': '分享您的反馈',
            'feedback.modal.description': '我们重视您的意见！请告诉我们如何改进您的偏好中心体验。',
            'feedback.form.label': '您的反馈',
            'feedback.form.placeholder': '告诉我们您的想法...',
            'feedback.form.email.label': '电子邮件（可选）',
            'feedback.form.email.placeholder': 'your.email@example.com',
            'feedback.button.submit': '提交反馈',
            'feedback.button.cancel': '取消',
            'feedback.notify.required': '请在提交前输入您的反馈。',
            'feedback.notify.success': '感谢您的反馈！我们很感激您的意见。',
            'feedback.notify.error': '无法提交反馈。请稍后再试。'
        },

        'de': {
            // Navigation
            'nav.privacy': 'Datenschutzrichtlinie',
            'nav.terms': 'Bedingungen',
            'nav.contact': 'Kontakt',
            'nav.toggle': 'Navigationsmenü umschalten',
            'nav.language': 'Sprache auswählen',

            // Main content
            'title': 'Präferenzzentrum',
            'intro.line1': 'Bei [Company Name] sind Ihre Privatsphäre und persönlichen Informationen wichtig für uns.',
            'intro.line2': 'Datenschutz beginnt damit, Ihnen Kontrolle über Ihre Daten zu geben, zusammen mit den Tools und Informationen, die Sie benötigen, um fundierte Entscheidungen zu treffen, mit denen Sie sich sicher fühlen können. In unserem Datenschutzzentrum laden wir Sie ein, die E-Mails anzupassen, die Sie erhalten.',

            // Form sections
            'section.marketing': 'Marketing-Zweck',
            'topic.products': 'Produkte & Innovationen',
            'topic.events': 'Veranstaltungen & Webinare',
            'topic.surveys': 'Umfragen & Fokusgruppen',
            'action.unsubscribe': 'Abmelden',

            // Email section
            'email.title': 'Kommunikationspräferenz',
            'email.notice': 'Sie können sich auf dieser Seite von Marketing-E-Mails abmelden. Wir werden jedoch weiterhin Transaktions-E-Mails (Kontoaktualisierungen, Transaktionen, behördliche Mitteilungen) senden, wie gesetzlich vorgeschrieben.',

            // Buttons
            'button.submit': 'Präferenzen Aktualisieren',
            'button.submitting': 'Wird aktualisiert...',

            // Notifications
            'notify.select': 'Bitte wählen Sie mindestens eine Präferenzoption aus.',
            'notify.success': 'Ihre Präferenzen wurden erfolgreich aktualisiert!',
            'notify.error': 'Erforderliche Ressourcen konnten nicht geladen werden. Bitte aktualisieren Sie die Seite.',
            'notify.unsaved': 'Sie haben nicht gespeicherte Änderungen. Sind Sie sicher, dass Sie gehen möchten?',
            'confirm.unsubscribe': 'Sind Sie sicher, dass Sie sich von allen Marketing-Kommunikationen abmelden möchten?\n\nSie erhalten weiterhin wichtige Transaktions-E-Mails.',

            // Footer
            'footer.legal': '[Company Name] ist der Datenverantwortliche für die Verarbeitung Ihrer personenbezogenen Daten gemäß der Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung). Ihre Einwilligung zum Erhalt von Marketing-Kommunikation wird gemäß Art. 6 Abs. 1 lit. a DSGVO verarbeitet. Sie haben das Recht, Ihre Einwilligung jederzeit zu widerrufen, indem Sie Ihre Präferenzen über dieses Datenschutzzentrum aktualisieren oder auf den Abmeldelink in jeder von uns gesendeten E-Mail klicken. Sie haben auch Rechte gemäß Art. 15-22 DSGVO, einschließlich des Rechts auf Zugang, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Weitere Informationen darüber, wie wir Ihre Daten verarbeiten, finden Sie in unserer Datenschutzrichtlinie. Um Ihre Rechte auszuüben oder Fragen zum Datenschutz zu stellen, wenden Sie sich bitte über den Kontaktlink auf dieser Seite an unseren Datenschutzbeauftragten.',
            'footer.updated': 'Zuletzt aktualisiert: 12-Okt-2025. V7',

            // Feedback system
            'feedback.bar.text': 'Helfen Sie uns, diese Erfahrung zu verbessern',
            'feedback.bar.button': 'Feedback Geben',
            'feedback.bar.close': 'Schließen',
            'feedback.modal.title': 'Teilen Sie Ihr Feedback',
            'feedback.modal.description': 'Wir schätzen Ihre Meinung! Lassen Sie uns wissen, wie wir Ihre Präferenzzentrums-Erfahrung verbessern können.',
            'feedback.form.label': 'Ihr Feedback',
            'feedback.form.placeholder': 'Sagen Sie uns, was Sie denken...',
            'feedback.form.email.label': 'E-Mail (optional)',
            'feedback.form.email.placeholder': 'ihre.email@beispiel.de',
            'feedback.button.submit': 'Feedback Absenden',
            'feedback.button.cancel': 'Abbrechen',
            'feedback.notify.required': 'Bitte geben Sie Ihr Feedback ein, bevor Sie es absenden.',
            'feedback.notify.success': 'Vielen Dank für Ihr Feedback! Wir schätzen Ihre Meinung.',
            'feedback.notify.error': 'Feedback konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'
        }
    };

// ============================================================================
// INTERNATIONALIZATION (i18n)
// ============================================================================



    
    // Translation Logic: language detection and DOM updates
const i18n = (function() {
        'use strict';

        const DEFAULT_LANGUAGE = 'en-US';
        const STORAGE_KEY = 'preferredLanguage';
        let currentLanguage = DEFAULT_LANGUAGE;

        
        function getBrowserLanguage() {
            const lang = navigator.language || navigator.userLanguage || DEFAULT_LANGUAGE;

            // Exact match first (e.g., 'en-US')
            if (TRANSLATIONS[lang]) {
                return lang;
            }

            // Try short code (e.g., 'en' from 'en-US')
            const shortLang = lang.substring(0, 2).toLowerCase();
            if (TRANSLATIONS[shortLang]) {
                return shortLang;
            }

            // Check if any language starts with short code
            for (const key in TRANSLATIONS) {
                if (key.toLowerCase().startsWith(shortLang)) {
                    return key;
                }
            }

            return DEFAULT_LANGUAGE;
        }

        
        function getCurrentLanguage() {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && TRANSLATIONS[stored]) {
                return stored;
            }
            return getBrowserLanguage();
        }

        
        function setLanguage(lang) {
            if (!TRANSLATIONS[lang]) {
                console.warn(`Language '${lang}' not supported, falling back to '${DEFAULT_LANGUAGE}'`);
                lang = DEFAULT_LANGUAGE;
            }
            currentLanguage = lang;
            localStorage.setItem(STORAGE_KEY, lang);
            document.documentElement.setAttribute('lang', lang);
            updatePageContent();
        }

        
        function t(key, fallback = '') {
            const translation = TRANSLATIONS[currentLanguage]?.[key];
            if (!translation) {
                console.warn(`Translation missing for key '${key}' in language '${currentLanguage}'`);
                return TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || fallback || key;
            }
            return translation;
        }

        
        function updatePageContent() {
            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const translation = t(key);

                // Preserve [Company Name] placeholders for later replacement
                el.textContent = translation;
            });

            // Update ARIA labels
            document.querySelectorAll('[data-i18n-aria]').forEach(el => {
                const key = el.getAttribute('data-i18n-aria');
                el.setAttribute('aria-label', t(key));
            });

            // Update placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                el.setAttribute('placeholder', t(key));
            });

            // Update page title
            const titleKey = 'title';
            if (typeof BRAND_NAME !== 'undefined') {
                document.title = t(titleKey) + ' | ' + BRAND_NAME;
            } else {
                document.title = t(titleKey);
            }

            // Update language selector
            const langSelector = document.getElementById('language-selector');
            if (langSelector) {
                langSelector.value = currentLanguage;
            }
        }

        
        function init() {
            currentLanguage = getCurrentLanguage();
            document.documentElement.setAttribute('lang', currentLanguage);
            updatePageContent();
        }

        // Public API
        return {
            init: init,
            setLanguage: setLanguage,
            getCurrentLanguage: () => currentLanguage,
            t: t,
            updatePageContent: updatePageContent
        };
    })();


// Email Validation System: Real-time validation with visual feedback
const EmailValidator = (function() {
    'use strict';

    // Track if email field has been touched by user
    let emailTouched = false;

    // Robust email regex pattern
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // More specific email validation pattern (RFC 5322 simplified)
    const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Maximum email length (RFC 5321)
    const MAX_EMAIL_LENGTH = 254;

    // Common domain typos and their corrections
    const DOMAIN_TYPOS = {
        'gmial.com': 'gmail.com',
        'gmai.com': 'gmail.com',
        'gmil.com': 'gmail.com',
        'gmal.com': 'gmail.com',
        'yahooo.com': 'yahoo.com',
        'yaho.com': 'yahoo.com',
        'hotmial.com': 'hotmail.com',
        'hotmail.co': 'hotmail.com',
        'outlok.com': 'outlook.com',
        'outlok.co.uk': 'outlook.co.uk',
        'yahooo.co.uk': 'yahoo.co.uk'
    };

    // List of disposable/temporary email providers
    const DISPOSABLE_DOMAINS = [
        'tempmail.com',
        'guerrillamail.com',
        'mailinator.com',
        '10minutemail.com',
        'throwaway.email',
        'temp-mail.org',
        'maildrop.cc',
        'mintemail.com',
        'trashmail.com',
        'yopmail.com',
        'fakeinbox.com'
    ];

    // Error messages
    const ERROR_MESSAGES = {
        'required': 'Email required',
        'invalid_format': 'Enter valid email address',
        'no_spaces': 'Email cannot contain spaces',
        'no_consecutive_dots': 'Email cannot contain consecutive dots',
        'invalid_chars': 'Email contains invalid characters',
        'too_long': 'Email address is too long (max 254 characters)',
        'invalid_tld': 'Email must end with .com, .org)',
        'disposable_email': 'Temporary email addresses are not allowed',
        'leading_trailing_dots': 'Email cannot start or end with a dot'
    };

    /**
     * Get domain typo suggestion if applicable
     * @param {string} email - Email address
     * @returns {object} - { hasSuggestion: boolean, suggestion: string|null, correctedEmail: string|null }
     */
    function checkDomainTypo(email) {
        const parts = email.split('@');
        if (parts.length !== 2) {
            return { hasSuggestion: false, suggestion: null, correctedEmail: null };
        }

        const domain = parts[1].toLowerCase();
        if (DOMAIN_TYPOS[domain]) {
            const correctedEmail = parts[0] + '@' + DOMAIN_TYPOS[domain];
            return {
                hasSuggestion: true,
                suggestion: `Did you mean ${correctedEmail}?`,
                correctedEmail: correctedEmail
            };
        }

        return { hasSuggestion: false, suggestion: null, correctedEmail: null };
    }

    /**
     * Check if email uses a disposable/temporary email provider
     * @param {string} email - Email address
     * @returns {boolean} - True if disposable email provider detected
     */
    function isDisposableEmail(email) {
        const domain = email.split('@')[1]?.toLowerCase() || '';
        return DISPOSABLE_DOMAINS.includes(domain);
    }

    /**
     * Validate email format with enhanced checks
     * @param {string} email - Email address to validate
     * @returns {object} - { isValid: boolean, error: string|null, suggestion: string|null, correctedEmail: string|null }
     */
    function validateEmailFormat(email) {
        // Check if empty
        if (!email || email.trim() === '') {
            return {
                isValid: false,
                error: ERROR_MESSAGES.required,
                suggestion: null,
                correctedEmail: null
            };
        }

        const trimmedEmail = email.trim();

        // Check length
        if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.too_long,
                suggestion: null,
                correctedEmail: null
            };
        }

        // Check for spaces
        if (trimmedEmail.includes(' ')) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.no_spaces,
                suggestion: null,
                correctedEmail: null
            };
        }

        // Check for consecutive dots
        if (trimmedEmail.includes('..')) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.no_consecutive_dots,
                suggestion: null,
                correctedEmail: null
            };
        }

        // Check for leading/trailing dots in local part
        const parts = trimmedEmail.split('@');
        if (parts.length === 2 && (parts[0].startsWith('.') || parts[0].endsWith('.'))) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.leading_trailing_dots,
                suggestion: null,
                correctedEmail: null
            };
        }

        // Check basic format first
        if (!EMAIL_REGEX.test(trimmedEmail)) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.invalid_format,
                suggestion: null,
                correctedEmail: null
            };
        }

        // Check strict format
        if (!STRICT_EMAIL_REGEX.test(trimmedEmail)) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.invalid_chars,
                suggestion: null,
                correctedEmail: null
            };
        }

        // Check for valid TLD (at least 2 characters after last dot)
        const domain = parts[1] || '';
        const lastDot = domain.lastIndexOf('.');
        if (lastDot === -1 || domain.length - lastDot - 1 < 2) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.invalid_tld,
                suggestion: null,
                correctedEmail: null
            };
        }

        // Check for disposable email
        if (isDisposableEmail(trimmedEmail)) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.disposable_email,
                suggestion: null,
                correctedEmail: null
            };
        }

        // Check for domain typos
        const typoCheck = checkDomainTypo(trimmedEmail);
        if (typoCheck.hasSuggestion) {
            return {
                isValid: false,
                error: 'This domain looks incorrect.',
                suggestion: typoCheck.suggestion,
                correctedEmail: typoCheck.correctedEmail
            };
        }

        return {
            isValid: true,
            error: null,
            suggestion: null,
            correctedEmail: null
        };
    }

    /**
     * Update the email field UI based on validation result
     * @param {HTMLElement} inputElement - The email input element
     * @param {boolean} isValid - Whether the email is valid
     * @param {object} validationResult - Full validation result with error, suggestion, correctedEmail
     */
    function updateFieldUI(inputElement, isValid, validationResult) {
        if (!inputElement) return;

        const fieldBlock = inputElement.closest('.textFormFieldBlock');
        if (!fieldBlock) return;

        const helperText = fieldBlock.querySelector('.field-helper-text');

        if (isValid) {
            // Valid state - keep has-error class for green border, just remove error class
            inputElement.classList.remove('error');
            if (emailTouched) {
                fieldBlock.classList.add('has-error');
            }

            if (helperText) {
                helperText.textContent = "We'll email you a response to your message.";
                helperText.style.color = '#828282';
                helperText.classList.add('visible');
            }
        } else {
            // Invalid state - only show error if field has been touched
            if (emailTouched) {
                inputElement.classList.add('error');
                fieldBlock.classList.add('has-error');

                if (helperText) {
                    let message = validationResult.error || 'Please enter a valid email address';

                    // Add suggestion if available
                    if (validationResult.suggestion) {
                        message += ` ${validationResult.suggestion}`;
                    }

                    helperText.textContent = message;
                    helperText.style.color = '#c13515';
                    helperText.classList.add('visible');

                    // Add ARIA attributes for accessibility
                    inputElement.setAttribute('aria-describedby', 'email-error-' + Date.now());
                    helperText.setAttribute('id', 'email-error-' + Date.now());
                }
            } else {
                // Field not touched yet, clear any existing error styling
                inputElement.classList.remove('error');
                fieldBlock.classList.remove('has-error');
                if (helperText) {
                    helperText.classList.remove('visible');
                }
            }
        }
    }

    /**
     * Validate email field and provide feedback
     * @param {HTMLElement} inputElement - The email input element
     * @returns {boolean} - Whether email is valid
     */
    function validateField(inputElement) {
        if (!inputElement) return false;

        const email = inputElement.value;
        const validation = validateEmailFormat(email);

        updateFieldUI(inputElement, validation.isValid, validation);

        return validation.isValid;
    }

    /**
     * Auto-correct email with suggested correction
     * @param {HTMLElement} inputElement - The email input element
     * @param {string} correctedEmail - The corrected email address
     */
    function acceptSuggestion(inputElement, correctedEmail) {
        if (!inputElement) return;

        inputElement.value = correctedEmail;
        validateField(inputElement);
    }

    /**
     * Debounce function for input events
     * @param {function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {function} - Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Initialize email validation for the form
     */
    function init() {
        const emailInput = document.querySelector('input[name="emailaddress1"]');
        if (!emailInput) return;

        // Add aria-describedby for accessibility
        emailInput.setAttribute('aria-label', 'Email address');

        // Set custom HTML5 validation messages
        emailInput.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Email is required');
            } else if (this.validity.typeMismatch) {
                this.setCustomValidity('Enter a valid email address');
            }
        });
        emailInput.addEventListener('input', function() {
            this.setCustomValidity('');
        });

        // Mark field as touched on first interaction
        const markAsTouched = function() {
            emailTouched = true;
        };

        // Validate on blur (when user leaves the field)
        emailInput.addEventListener('blur', function() {
            markAsTouched();
            this.value = this.value.trim();
            validateField(this);
        });

        // Only validate on input to update form button state, but don't show errors
        emailInput.addEventListener('input', function() {
            // Validate silently (for button state) but don't show error messages until blur
            if (emailTouched) {
                validateField(this);
            }
        });

        // Clear error state when field is focused and user starts typing fresh
        emailInput.addEventListener('focus', function() {
            if (this.value === '') {
                this.classList.remove('error');
                const fieldBlock = this.closest('.textFormFieldBlock');
                if (fieldBlock) {
                    fieldBlock.classList.remove('has-error');
                    const helperText = fieldBlock.querySelector('.field-helper-text');
                    if (helperText) {
                        helperText.textContent = "We'll email you a response to your message.";
                        helperText.style.color = '#828282';
                        helperText.classList.add('visible');
                    }
                }
            }
        });

        // Allow accepting suggestions by pressing Enter or Tab
        emailInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === 'Tab') {
                const fieldBlock = this.closest('.textFormFieldBlock');
                const helperText = fieldBlock?.querySelector('.field-helper-text');

                // Check if helper text contains a suggestion
                if (helperText && helperText.textContent.includes('Did you mean')) {
                    const match = helperText.textContent.match(/Did you mean ([\w.-]+@[\w.-]+\.\w+)\?/);
                    if (match) {
                        acceptSuggestion(this, match[1]);
                        if (event.key === 'Enter') {
                            event.preventDefault();
                        }
                    }
                }
            }
        });
    }

    // Public API
    return {
        init: init,
        validateField: validateField,
        validateEmailFormat: validateEmailFormat,
        acceptSuggestion: acceptSuggestion,
        checkDomainTypo: checkDomainTypo,
        isDisposableEmail: isDisposableEmail
    };
})();


// Name Validation System: Real-time validation with visual feedback
const NameValidator = (function() {
    'use strict';

    // Minimum length for names
    const MIN_NAME_LENGTH = 2;

    // Valid name characters: letters, spaces, hyphens, apostrophes
    const NAME_REGEX = /^[a-zA-Z\s\-']+$/;

    // Track which fields have been touched by user
    const touchedFields = new Map();

    // Error messages
    const ERROR_MESSAGES = {
        'required': 'This field is required',
        'too_short': `Name must be at least ${MIN_NAME_LENGTH} characters`,
        'invalid_chars': 'Name can only contain letters, spaces, hyphens, and apostrophes',
        'leading_trailing_space': 'Name cannot start or end with a space'
    };

    /**
     * Validate name format
     * @param {string} name - Name to validate
     * @returns {object} - { isValid: boolean, error: string|null }
     */
    function validateNameFormat(name) {
        // Check if empty
        if (!name || name.trim() === '') {
            return {
                isValid: false,
                error: ERROR_MESSAGES.required
            };
        }

        const trimmedName = name.trim();

        // Check for leading/trailing spaces
        if (name !== trimmedName && (name.startsWith(' ') || name.endsWith(' '))) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.leading_trailing_space
            };
        }

        // Check minimum length
        if (trimmedName.length < MIN_NAME_LENGTH) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.too_short
            };
        }

        // Check for valid characters only
        if (!NAME_REGEX.test(trimmedName)) {
            return {
                isValid: false,
                error: ERROR_MESSAGES.invalid_chars
            };
        }

        return {
            isValid: true,
            error: null
        };
    }

    /**
     * Update the name field UI based on validation result
     * @param {HTMLElement} inputElement - The name input element
     * @param {boolean} isValid - Whether the name is valid
     * @param {object} validationResult - Full validation result with error
     */
    function updateFieldUI(inputElement, isValid, validationResult) {
        if (!inputElement) return;

        const fieldName = inputElement.name;
        const isTouched = touchedFields.get(fieldName) || false;

        const fieldBlock = inputElement.closest('.textFormFieldBlock');
        if (!fieldBlock) return;

        const helperText = fieldBlock.querySelector('.field-helper-text');

        if (isValid) {
            // Valid state - keep has-error class for green border, just remove error class
            inputElement.classList.remove('error');
            if (isTouched) {
                fieldBlock.classList.add('has-error');
            }

            if (helperText) {
                helperText.textContent = '';
                helperText.style.color = '#828282';
                helperText.classList.remove('visible');
            }
        } else {
            // Invalid state - only show error if field has been touched
            if (isTouched) {
                inputElement.classList.add('error');
                fieldBlock.classList.add('has-error');

                if (helperText) {
                    helperText.textContent = validationResult.error || 'Please enter a valid name';
                    helperText.style.color = '#c13515';
                    helperText.classList.add('visible');

                    // Add ARIA attributes for accessibility
                    inputElement.setAttribute('aria-describedby', 'name-error-' + Date.now());
                    helperText.setAttribute('id', 'name-error-' + Date.now());
                }
            } else {
                // Field not touched yet, clear any existing error styling
                inputElement.classList.remove('error');
                fieldBlock.classList.remove('has-error');
                if (helperText) {
                    helperText.classList.remove('visible');
                }
            }
        }
    }

    /**
     * Validate name field and provide feedback
     * @param {HTMLElement} inputElement - The name input element
     * @returns {boolean} - Whether name is valid
     */
    function validateField(inputElement) {
        if (!inputElement) return false;

        const name = inputElement.value;
        const validation = validateNameFormat(name);

        updateFieldUI(inputElement, validation.isValid, validation);

        return validation.isValid;
    }

    /**
     * Debounce function for input events
     * @param {function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {function} - Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Initialize name validation for a specific field
     * @param {string} fieldName - Name attribute of the field ('firstname' or 'lastname')
     */
    function init(fieldName) {
        const nameInput = document.querySelector(`input[name="${fieldName}"]`);
        if (!nameInput) return;

        // Initialize touched state
        touchedFields.set(fieldName, false);

        // Add aria label for accessibility
        nameInput.setAttribute('aria-label', fieldName === 'firstname' ? 'First name' : 'Last name');

        // Set custom HTML5 validation messages
        nameInput.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('This field is required');
            } else if (this.validity.tooShort) {
                this.setCustomValidity(`Name must be at least ${MIN_NAME_LENGTH} characters`);
            }
        });
        nameInput.addEventListener('input', function() {
            this.setCustomValidity('');
        });

        // Mark field as touched on first change
        const markAsTouched = function() {
            touchedFields.set(fieldName, true);
        };

        // Mark field as touched on blur (when user leaves the field)
        nameInput.addEventListener('blur', function() {
            markAsTouched();
            this.value = this.value.trim();
            validateField(this);
        });

        // Only validate on input to update form button state, but don't show errors
        nameInput.addEventListener('input', function() {
            // Mark as touched but validate silently (for button state)
            if (touchedFields.get(fieldName)) {
                validateField(this);
            }
        });

        // Clear error state when field is focused and empty
        nameInput.addEventListener('focus', function() {
            if (this.value === '') {
                this.classList.remove('error');
                const fieldBlock = this.closest('.textFormFieldBlock');
                if (fieldBlock) {
                    fieldBlock.classList.remove('has-error');
                    const helperText = fieldBlock.querySelector('.field-helper-text');
                    if (helperText) {
                        helperText.classList.remove('visible');
                    }
                }
            }
        });
    }

    // Public API
    return {
        init: init,
        validateField: validateField,
        validateNameFormat: validateNameFormat
    };
})();


// Message Validation System: Character counter and validation
const MessageValidator = (function() {
    'use strict';

    // Track if message field has been touched by user
    let messageTouched = false;

    const MIN_LENGTH = 3;
    const MAX_LENGTH = 2000;

    /**
     * Update character counter display (hidden from user view)
     * @param {HTMLElement} textareaElement - The textarea element
     */
    function updateCharacterCount(textareaElement) {
        if (!textareaElement) return;

        // Character counter is only used internally for validation
        // No visual display to user
    }

    /**
     * Validate message field and provide feedback
     * @param {HTMLElement} textareaElement - The textarea element
     * @returns {boolean} - Whether message is valid
     */
    function validateField(textareaElement) {
        if (!textareaElement) return false;

        const message = textareaElement.value;
        const isValid = message.trim().length >= MIN_LENGTH && message.length <= MAX_LENGTH;

        const fieldBlock = textareaElement.closest('.textFormFieldBlock');
        if (!fieldBlock) return isValid;

        const helperText = fieldBlock.querySelector('.field-helper-text');

        if (isValid) {
            // Valid state - keep has-error class for green border, just remove error class
            textareaElement.classList.remove('error');
            if (messageTouched) {
                fieldBlock.classList.add('has-error');
            }

            if (helperText) {
                helperText.textContent = '';
                helperText.classList.remove('visible');
            }
        } else {
            // Invalid state - only show error if field has been touched
            if (messageTouched) {
                textareaElement.classList.add('error');
                fieldBlock.classList.add('has-error');

                if (helperText) {
                    if (message.trim().length === 0) {
                        helperText.textContent = 'Message is required';
                    } else if (message.trim().length < MIN_LENGTH) {
                        helperText.textContent = `Message must be at least ${MIN_LENGTH} characters`;
                    } else if (message.length > MAX_LENGTH) {
                        helperText.textContent = `Message cannot exceed ${MAX_LENGTH} characters`;
                    }
                    helperText.style.color = '#c13515';
                    helperText.classList.add('visible');
                }
            } else {
                // Field not touched yet, clear any existing error styling
                textareaElement.classList.remove('error');
                fieldBlock.classList.remove('has-error');
                if (helperText) {
                    helperText.classList.remove('visible');
                }
            }
        }

        return isValid;
    }

    /**
     * Initialize message validation for the form
     */
    function init() {
        const messageInput = document.querySelector('textarea[name="description"]');
        if (!messageInput) return;

        // Set custom HTML5 validation messages
        messageInput.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Message is required');
            } else if (this.validity.tooShort) {
                this.setCustomValidity(`Message must be at least ${MIN_LENGTH} characters`);
            } else if (this.validity.tooLong) {
                this.setCustomValidity(`Message cannot exceed ${MAX_LENGTH} characters`);
            }
        });
        messageInput.addEventListener('input', function() {
            this.setCustomValidity('');
        });

        // Add aria label
        messageInput.setAttribute('aria-label', 'Message');

        // Mark field as touched on first interaction
        const markAsTouched = function() {
            messageTouched = true;
        };

        // Update counter on input, but don't show validation errors until blur
        messageInput.addEventListener('input', function() {
            updateCharacterCount(this);
            // Only validate silently (for button state) if already touched
            if (messageTouched) {
                validateField(this);
            }
        });

        // Show validation errors when user leaves the field
        messageInput.addEventListener('blur', function() {
            markAsTouched();
            validateField(this);
        });

        // Clear error state when field is focused and empty
        messageInput.addEventListener('focus', function() {
            if (this.value === '') {
                this.classList.remove('error');
                const fieldBlock = this.closest('.textFormFieldBlock');
                if (fieldBlock) {
                    fieldBlock.classList.remove('has-error');
                }
            }
        });

        // Initialize counter display
        updateCharacterCount(messageInput);
    }

    // Public API
    return {
        init: init,
        validateField: validateField,
        updateCharacterCount: updateCharacterCount
    };
})();


// Form Validation Tracker: Monitor all form fields and update button state
const FormValidator = (function() {
    'use strict';

    let formState = {
        firstname: false,
        lastname: false,
        email: false,
        description: false
    };

    /**
     * Update submit button state based on form validation
     */
    function updateSubmitButtonState() {
        const submitButton = document.querySelector('.submitButton');
        if (!submitButton) return;

        const allValid = Object.values(formState).every(val => val === true);
        submitButton.disabled = !allValid;
    }

    /**
     * Validate a field and update form state
     */
    function validateField(fieldName, isValid) {
        if (fieldName in formState) {
            formState[fieldName] = isValid;
            updateSubmitButtonState();
        }
    }

    /**
     * Initialize form validation tracking
     */
    function init() {
        const form = document.querySelector('form#contactForm');
        if (!form) return;

        // Track first name field (using NameValidator)
        const firstnameInput = form.querySelector('input[name="firstname"]');
        if (firstnameInput) {
            const checkFirstnameValidity = function() {
                const validation = NameValidator.validateNameFormat(firstnameInput.value);
                validateField('firstname', validation.isValid);
            };
            firstnameInput.addEventListener('blur', checkFirstnameValidity);
            firstnameInput.addEventListener('input', checkFirstnameValidity);
        }

        // Track last name field (using NameValidator)
        const lastnameInput = form.querySelector('input[name="lastname"]');
        if (lastnameInput) {
            const checkLastnameValidity = function() {
                const validation = NameValidator.validateNameFormat(lastnameInput.value);
                validateField('lastname', validation.isValid);
            };
            lastnameInput.addEventListener('blur', checkLastnameValidity);
            lastnameInput.addEventListener('input', checkLastnameValidity);
        }

        // Track email field (uses EmailValidator)
        const emailInput = form.querySelector('input[name="emailaddress1"]');
        if (emailInput) {
            // Check email validity immediately on input (for real-time button state)
            const checkEmailValidity = function() {
                const validation = EmailValidator.validateEmailFormat(emailInput.value);
                validateField('email', validation.isValid);
            };

            // Validate on every input for immediate button state feedback
            emailInput.addEventListener('input', checkEmailValidity);
            emailInput.addEventListener('blur', function() {
                this.value = this.value.trim();
                checkEmailValidity();
            });
        }

        // Track message/description field (using MessageValidator)
        const descriptionInput = form.querySelector('textarea[name="description"]');
        if (descriptionInput) {
            const checkMessageValidity = function() {
                const validation = MessageValidator.validateField(descriptionInput);
                // Message is valid if it has at least 3 characters
                const isValid = descriptionInput.value.trim().length >= 3;
                validateField('description', isValid);
            };
            descriptionInput.addEventListener('blur', checkMessageValidity);
            descriptionInput.addEventListener('input', checkMessageValidity);
        }

        // Disable button initially
        updateSubmitButtonState();
    }

    /**
     * Debounce function for input events
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API
    return {
        init: init,
        validateField: validateField,
        updateSubmitButtonState: updateSubmitButtonState
    };
})();






    
    // Main Application: Preference Center core logic
const PreferenceCenter = (function() {
        'use strict';

        // State management
        let formIsDirty = false;
        let isSubmitting = false;

        
        function showLoader() {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('active');
            }
        }

        
        function hideLoader() {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.remove('active');
            }
        }

        
        function showNotification(message, type = 'success', duration = 5000) {
            // Remove any existing notifications
            const existing = document.querySelectorAll('.notification-message');
            existing.forEach(el => el.remove());

            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification-message ${type}`;
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'polite');

            // Add icon based on type
            const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠';

            // Add close button for manual dismissal
            const closeBtn = document.createElement('button');
            closeBtn.className = 'notification-close';
            closeBtn.innerHTML = '×';
            closeBtn.setAttribute('aria-label', 'Close notification');
            closeBtn.onclick = function() {
                notification.classList.add('hiding');
                setTimeout(() => notification.remove(), 300);
            };

            notification.innerHTML = `<span style="font-size: 20px; font-weight: bold;">${icon}</span><span>${message}</span>`;
            notification.appendChild(closeBtn);

            document.body.appendChild(notification);

            // Trigger animation
            setTimeout(() => notification.classList.add('show'), 10);

            // Auto-dismiss after duration (if duration > 0)
            if (duration > 0) {
                setTimeout(() => {
                    notification.classList.add('hiding');
                    setTimeout(() => notification.remove(), 300);
                }, duration);
            }
        }

        
        function validateForm() {
            const form = document.querySelector('form');
            if (!form) return false;

            // Check if at least one topic checkbox is checked OR unsubscribe is checked
            const topicCheckboxes = form.querySelectorAll('input[name="msdynmkt_topicid;optInWhenChecked"]');
            const unsubscribeCheckbox = form.querySelector('input[name="msdynmkt_purposeid;optInWhenChecked"]');

            const hasTopicSelected = Array.from(topicCheckboxes).some(cb => cb.checked);
            const hasUnsubscribeSelected = unsubscribeCheckbox && unsubscribeCheckbox.checked;

            // If unsubscribe is selected, show confirmation
            if (hasUnsubscribeSelected) {
                return confirm(i18n.t('confirm.unsubscribe'));
            }

            // If no selections at all, warn user
            if (!hasTopicSelected && !hasUnsubscribeSelected) {
                showNotification(i18n.t('notify.select'), 'warning');
                return false;
            }

            return true;
        }

        
        function handleFormSubmit(event) {
            // Prevent duplicate submissions
            if (isSubmitting) {
                event.preventDefault();
                return false;
            }

            // Validate form
            if (!validateForm()) {
                event.preventDefault();
                return false;
            }

            // Mark as submitting
            isSubmitting = true;
            formIsDirty = false;

            // Show loader
            showLoader();

            // Disable submit button
            const submitButton = document.querySelector('.submitButton');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = i18n.t('button.submitting');
            }

            // Allow form to submit, then handle response
            // Note: Dynamics 365 handles the actual submission
            // We'll simulate success after a delay
            setTimeout(() => {
                hideLoader();
                isSubmitting = false;

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = i18n.t('button.submit');
                }

                // Show success message
                showNotification(i18n.t('notify.success'), 'success');

                // Handle redirect if configured
                if (typeof REDIRECT_URL !== 'undefined' && REDIRECT_URL) {
                    const delay = typeof REDIRECT_DELAY_MS !== 'undefined' ? REDIRECT_DELAY_MS : 2000;
                    setTimeout(() => {
                        window.location.href = REDIRECT_URL;
                    }, delay);
                }
            }, 1500); // Simulated delay for Dynamics 365 processing
        }

        
        function markFormDirty() {
            formIsDirty = true;
        }

        
        function handleBeforeUnload(event) {
            if (formIsDirty && !isSubmitting) {
                event.preventDefault();
                event.returnValue = i18n.t('notify.unsaved');
                return event.returnValue;
            }
        }

        
        function initBrandReplacement() {
            const elements = document.querySelectorAll('p, span, h1, h2, title, button, label, .footer-text, .copyright');
            elements.forEach(el => {
                if (el.textContent.includes('[Company Name]')) {
                    el.textContent = el.textContent.replace(/\[Company Name\]/g, BRAND_NAME);
                }
            });

            // Update page title
            if (document.title.includes('[Company Name]')) {
                document.title = document.title.replace(/\[Company Name\]/g, BRAND_NAME);
            }
        }

        
        function initCopyright() {
            const currentYear = new Date().getFullYear();
            const copyrightElement = document.querySelector('.copyright');
            if (copyrightElement) {
                copyrightElement.textContent = `© ${BRAND_NAME} ${currentYear}`;
            }
        }

        
        function initMobileMenu() {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');

            if (!mobileToggle || !navLinks) return;

            // Handle mobile menu toggle click
            mobileToggle.addEventListener('click', function() {
                const isExpanded = navLinks.classList.contains('active');
                navLinks.classList.toggle('active');
                this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
                this.setAttribute('aria-expanded', !isExpanded);
            });

            // Handle Escape key to close menu
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.textContent = '☰';
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileToggle.focus();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (navLinks.classList.contains('active') &&
                    !navLinks.contains(event.target) &&
                    !mobileToggle.contains(event.target)) {
                    navLinks.classList.remove('active');
                    mobileToggle.textContent = '☰';
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        
        function initFormTracking() {
            const form = document.querySelector('form');
            if (!form) return;

            // Track changes to form inputs
            const inputs = form.querySelectorAll('input[type="checkbox"]');
            inputs.forEach(input => {
                input.addEventListener('change', markFormDirty);
            });

            // Handle form submission
            form.addEventListener('submit', handleFormSubmit);

            // Warn before leaving with unsaved changes
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        
        function checkDynamicsScript() {
            // Try to detect if Dynamics 365 script is loaded
            // This is a best-effort check
            setTimeout(() => {
                // Check for common Dynamics 365 elements or functions
                const dynamicsElements = document.querySelectorAll('[data-editorblocktype]');
                if (dynamicsElements.length === 0) {
                    console.warn('Dynamics 365 elements not detected. The preference center may not function correctly.');
                    // Optionally show a user-facing message
                    // showNotification('Some features may not be available. Please refresh the page.', 'warning', 10000);
                }
            }, 1000);
        }

        
        function init() {
            try {
                initBrandReplacement();
                initCopyright();
                initMobileMenu();
                initFormTracking();
                checkDynamicsScript();
            } catch (error) {
                console.error('Error initializing Preference Center:', error);
                showNotification(i18n.t('notify.error'), 'error', 2000);
            }
        }

        // Return public API
        return {
            init: init,
            showNotification: showNotification
        };
    })();

//Feedback System: Handles sticky feedback bar and modal for user feedback.
    // Feedback System: sticky bar and modal
const FeedbackSystem = (function() {
        'use strict';

        const STORAGE_KEY = 'feedbackBarDismissed';
        let isSubmitting = false;

        
        function isDismissed() {
            return sessionStorage.getItem(STORAGE_KEY) === 'true';
        }

        
        function markAsDismissed() {
            sessionStorage.setItem(STORAGE_KEY, 'true');
        }

        
        function showBar() {
            const bar = document.getElementById('feedback-bar');
            if (bar) {
                setTimeout(() => {
                    bar.classList.add('show');
                }, 100);
            }
        }

        
        function hideBar() {
            const bar = document.getElementById('feedback-bar');
            if (bar) {
                bar.classList.remove('show');
            }
        }

        
        function showModal() {
            const modal = document.getElementById('feedback-modal');
            if (modal) {
                modal.classList.add('show');

                // Focus the first input for accessibility
                const textarea = document.getElementById('feedback-textarea');
                if (textarea) {
                    setTimeout(() => textarea.focus(), 100);
                }

                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            }
        }

        
        function hideModal() {
            const modal = document.getElementById('feedback-modal');
            if (modal) {
                modal.classList.remove('show');

                // Restore body scroll
                document.body.style.overflow = '';

                // Clear form
                const textarea = document.getElementById('feedback-textarea');
                const emailInput = document.getElementById('feedback-email');
                if (textarea) textarea.value = '';
                if (emailInput) emailInput.value = '';
            }
        }

        
        function handleBarDismiss() {
            hideBar();
            markAsDismissed();
        }

        
        function handleOpenModal() {
            showModal();
        }

        
        function handleCloseModal() {
            hideModal();
        }

        
        function validateFeedback() {
            const textarea = document.getElementById('feedback-textarea');
            if (!textarea || !textarea.value.trim()) {
                PreferenceCenter.showNotification(i18n.t('feedback.notify.required'), 'warning');
                return false;
            }
            return true;
        }

        
        function handleSubmitFeedback(event) {
            event.preventDefault();

            if (isSubmitting) return;

            if (!validateFeedback()) return;

            isSubmitting = true;

            const submitButton = document.getElementById('feedback-submit-button');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = i18n.t('button.submitting') || 'Submitting...';
            }

            // Get form data
            const textarea = document.getElementById('feedback-textarea');
            const emailInput = document.getElementById('feedback-email');
            const feedbackData = {
                feedback: textarea ? textarea.value : '',
                email: emailInput ? emailInput.value : '',
                timestamp: new Date().toISOString(),
                page: 'Preference Center',
                language: i18n.getCurrentLanguage()
            };

            // Log feedback data (in production, send to your backend/analytics)
            console.log('Feedback submitted:', feedbackData);

            // Simulate API call
            setTimeout(() => {
                isSubmitting = false;

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = i18n.t('feedback.button.submit');
                }

                // Show success notification
                PreferenceCenter.showNotification(i18n.t('feedback.notify.success'), 'success');

                // Close modal
                hideModal();

                // Optionally hide bar after successful submission
                hideBar();
                markAsDismissed();
            }, 1000);
        }

        
        function initEventListeners() {
            // Bar buttons
            const barButton = document.getElementById('feedback-bar-button');
            const barClose = document.getElementById('feedback-bar-close');

            if (barButton) {
                barButton.addEventListener('click', handleOpenModal);
            }

            if (barClose) {
                barClose.addEventListener('click', handleBarDismiss);
            }

            // Modal buttons
            const modalClose = document.getElementById('feedback-modal-close');
            const cancelButton = document.getElementById('feedback-cancel-button');
            const submitButton = document.getElementById('feedback-submit-button');

            if (modalClose) {
                modalClose.addEventListener('click', handleCloseModal);
            }

            if (cancelButton) {
                cancelButton.addEventListener('click', handleCloseModal);
            }

            if (submitButton) {
                submitButton.addEventListener('click', handleSubmitFeedback);
            }

            // Close modal when clicking backdrop
            const modalOverlay = document.getElementById('feedback-modal');
            if (modalOverlay) {
                modalOverlay.addEventListener('click', function(event) {
                    if (event.target === modalOverlay) {
                        handleCloseModal();
                    }
                });
            }

            // Close modal with Escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    const modal = document.getElementById('feedback-modal');
                    if (modal && modal.classList.contains('show')) {
                        handleCloseModal();
                    }
                }
            });
        }

        
        function init() {
            if (!ENABLE_FEEDBACK_BAR) return;

            initEventListeners();

            // Show bar after delay if not dismissed
            if (!isDismissed()) {
                setTimeout(() => {
                    showBar();
                }, FEEDBACK_BAR_SHOW_DELAY);
            }
        }

        // Public API
        return {
            init: init,
            showModal: showModal,
            hideModal: hideModal
        };
    })();
    